import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import RecipeCreate from './RecipeCreate.vue';
import DataAccess from './DataAccess';
import { routes, recipeRoute } from './routing/routes';

jest.mock('./DataAccess');
const router = new VueRouter({ routes });

describe('RecipeCreate', () => {
  let wrapper;

  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);

    DataAccess.mockClear();
    wrapper = shallowMount(RecipeCreate, { localVue, router });
  })

  test('will add a fermentable correctly', () => {
    wrapper.vm.addFermentable();
    expect(wrapper.vm.mash.fermentables).toEqual(expect.arrayContaining(['']));
  });

  test('will add a hop correctly', () => {
    const expectedHop = { amount: 0, name: '', alphaAcids: 0, time: 0 };
    wrapper.vm.addHop();
    expect(wrapper.vm.hops).toEqual(expect.arrayContaining([ expectedHop ]));
  });

  test('will remove a hop correctly', () => {
    const hopOne = { amount: 2, name: 'Warrior', alphaAcids: 17.7, time: 60 };
    const hopTwo = { amount: 3, name: 'Sabro', alphaAcids: 15, time: 0 };
    wrapper.vm.hops.push(hopOne);
    wrapper.vm.hops.push(hopTwo);
    wrapper.vm.removeHop(0);
    expect(wrapper.vm.hops).toEqual(expect.arrayContaining([ hopTwo ]));
  });

  test('will navigate to the recipe on successful commit', async () => {
    DataAccess.putRecipe.mockResolvedValue({});
    const expectedId = 'expected';
    wrapper.vm.$data._id = expectedId;
    await wrapper.vm.commit();
    expect(wrapper.vm.$route.name).toEqual(recipeRoute.name);
    expect(wrapper.vm.$route.params.id).toEqual(expectedId);
  });
});
