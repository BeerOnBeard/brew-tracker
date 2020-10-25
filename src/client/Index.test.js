jest.mock('./dataAccess');

import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Index from './Index.vue';
import { getRecipes, getRecentBrews } from './dataAccess';
import { routes } from './routing/routes';

describe('Index', () => {
  const router = new VueRouter({ routes });
  let wrapper;
  const mockRecipes = [ { name: 'Mock Recipe'} ];
  const mockBrews = [ { recipe: { name: 'Recently brewed recipe' } } ];

  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);

    getRecipes.mockClear();
    getRecipes.mockResolvedValue({ recipes: mockRecipes });
    getRecentBrews.mockClear();
    getRecentBrews.mockResolvedValue({ brews: mockBrews });
    wrapper = shallowMount(Index, { localVue, router });
  });

  test('will get data when created', () => {
    expect(wrapper.vm.recipes).toEqual(mockRecipes);
    expect(wrapper.vm.brews).toEqual(mockBrews);
  });
});
