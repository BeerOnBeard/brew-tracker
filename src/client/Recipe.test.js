jest.mock('./dataAccess');

import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Recipe from './Recipe.vue';
import { getRecipe, putRecipe, getBrews, putBrew } from './dataAccess';
import { routes, brewRoute } from './routing/routes';


describe('Recipe', () => {
  const router = new VueRouter({ routes });
  let wrapper;
  let mockRecipe = { name: 'Mock Recipe' };
  let mockBrews = [{}];

  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);

    getRecipe.mockClear();
    getBrews.mockClear();
    putBrew.mockClear();
    putRecipe.mockClear();
    getRecipe.mockResolvedValue({ recipe: mockRecipe });
    getBrews.mockResolvedValue({ brews: mockBrews });
    putBrew.mockResolvedValue({});
    putRecipe.mockImplementation(recipe => Promise.resolve({ recipe }));
    wrapper = shallowMount(Recipe, { localVue, router });
  });

  it('will get the recipe and brews when created', async () => {
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.recipe).toEqual(mockRecipe);
    expect(wrapper.vm.brews).toEqual(mockBrews);
  });

  it('will create a new brew when starting a new brew day', async () => {
    await wrapper.vm.startNewBrewDay();
    expect(putBrew).toHaveBeenCalled();
  })

  it('will navigate to brew page after starting a new brew day', async () => {
    await wrapper.vm.startNewBrewDay();
    expect(wrapper.vm.$route.name).toEqual(brewRoute.name);
    expect(wrapper.vm.$route.params.id).toBeDefined();
  });

  it('will format the brew date correctly', () => {
    const value = '2020-02-02T13:00:00Z';
    const result = wrapper.vm.$options.filters.formatBrewDate(value);
    expect(result).toEqual('2020-02-02');
  });

  it('will update the local recipe when commit returns successfully', async () => {
    const updatedRecipe = { name: 'updated recipe' };
    await wrapper.vm.save(updatedRecipe);
    expect(wrapper.vm.recipe).toEqual(updatedRecipe);
  });

  it('will set editing to false when commit returns successfully', async () => {
    await wrapper.vm.save({ name: 'updated recipe' });
    expect(wrapper.vm.editing).toEqual(false);
  });
});
