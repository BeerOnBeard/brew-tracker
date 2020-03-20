jest.mock('./dataAccess');

import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import RecipeCreate from './RecipeCreate.vue';
import { putRecipe } from './dataAccess';
import { routes, recipeRoute } from './routing/routes';

describe('RecipeCreate', () => {  
  const router = new VueRouter({ routes });
  let wrapper;

  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);

    putRecipe.mockClear();
    wrapper = shallowMount(RecipeCreate, { localVue, router });
  });

  test('will navigate to the recipe on successful commit', async () => {
    putRecipe.mockResolvedValue({});
    const expectedId = 'mock recipe';
    await wrapper.vm.commit({ _id: expectedId });
    expect(wrapper.vm.$route.name).toEqual(recipeRoute.name);
    expect(wrapper.vm.$route.params.id).toEqual(expectedId);
  });
});
