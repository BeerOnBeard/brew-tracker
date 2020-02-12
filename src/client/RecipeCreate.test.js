import { shallowMount } from '@vue/test-utils';
import RecipeCreate from './RecipeCreate.vue';
import DataAccess from './DataAccess';

jest.mock('./DataAccess');

describe('RecipeCreate', () => {
  let wrapper;
  let mockRouter;
  beforeEach(() => {
    mockRouter = { push: jest.fn() };
    wrapper = shallowMount(RecipeCreate, { mocks: { $router: mockRouter } });
    DataAccess.mockClear();
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
    await wrapper.vm.$nextTick();
    expect(mockRouter.push.mock.calls[0]).toEqual(expect.arrayContaining([
      { name: 'recipe', params: { id: expectedId } }
    ]));
  });
});
