jest.mock('./dataAccess');

import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Index from './Index.vue';
import { getRecipes } from './dataAccess';
import { routes } from './routing/routes';

describe('Index', () => {
  const router = new VueRouter({ routes });
  let wrapper;
  const mockRecipes = [ { name: 'Mock Recipe'} ];

  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);

    getRecipes.mockClear();
    getRecipes.mockResolvedValue({ recipes: mockRecipes });
    wrapper = shallowMount(Index, { localVue, router });
  });

  test('will get recipes when created', () => {
    expect(wrapper.vm.recipes).toEqual(mockRecipes);
  });
});
