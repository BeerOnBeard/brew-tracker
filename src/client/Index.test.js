import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Index from './Index.vue';
import DataAccess from './DataAccess';
import { routes, recipeRoute, recipeCreateRoute } from './routing/routes';

jest.mock('./DataAccess');
const router = new VueRouter({ routes });

describe('Index', () => {
  let wrapper;
  const mockRecipes = [ { name: 'Mock Recipe'} ];

  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);

    DataAccess.mockClear();
    DataAccess.getRecipes.mockResolvedValue({ recipes: mockRecipes });
    wrapper = shallowMount(Index, { localVue, router });
  });

  test('will get recipes when created', () => {
    expect(wrapper.vm.recipes).toEqual(mockRecipes);
  });
});
