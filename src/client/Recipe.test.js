import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Recipe from './Recipe.vue';
import DataAccess from './DataAccess';
import { routes, brewRoute } from './routing/routes';

jest.mock('./DataAccess');
const router = new VueRouter({ routes });

describe('Recipe', () => {
  let wrapper;
  let mockRecipe = { name: 'Mock Recipe' };
  let mockBrews = [{}];

  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);

    DataAccess.mockClear();
    DataAccess.getRecipe.mockResolvedValue({ recipe: mockRecipe });
    DataAccess.getBrews.mockResolvedValue({ brews: mockBrews });
    DataAccess.putBrew.mockResolvedValue({});
    wrapper = shallowMount(Recipe, { localVue, router });
  });

  test('will get the recipe and brews when created', async () => {
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.recipe).toEqual(mockRecipe);
    expect(wrapper.vm.brews).toEqual(mockBrews);
  });

  test('will create a new brew when starting a new brew day', async () => {
    await wrapper.vm.startNewBrewDay();
    expect(DataAccess.putBrew).toHaveBeenCalled();
  })

  test('will navigate to brew page after starting a new brew day', async () => {
    await wrapper.vm.startNewBrewDay();
    expect(wrapper.vm.$route.name).toEqual(brewRoute.name);
    expect(wrapper.vm.$route.params.id).toBeDefined();
  });

  test('will format the brew date correctly', () => {
    const value = '2020-02-02T13:00:00Z';
    const result = wrapper.vm.$options.filters.formatBrewDate(value);
    expect(result).toEqual('2020-02-02');
  });
});
