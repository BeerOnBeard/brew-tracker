import { shallowMount, createLocalVue } from '@vue/test-utils';
import RecipeEdit from './RecipeEdit.vue';

const headerStartingLevel = 2;
const recipe = {
  mash: {
    fermentables: []
  },
  hops: []
};

function getMountedComponent() {
  return shallowMount(RecipeEdit, { propsData: { recipe, headerStartingLevel } });
}

describe('RecipeEdit', () => {  
  it('adds a fermentable correctly', () => {
    const wrapper = getMountedComponent();
    wrapper.vm.addFermentable();
    expect(wrapper.vm.mash.fermentables).toEqual(expect.arrayContaining(['']));
  });

  it('adds a hop correctly', () => {
    const expectedHop = { amount: 0, name: '', alphaAcids: 0, time: 0 };
    const wrapper = getMountedComponent();
    wrapper.vm.addHop();
    expect(wrapper.vm.hops).toEqual(expect.arrayContaining([ expectedHop ]));
  });

  it('removes a hop correctly', () => {
    const hopOne = { amount: 2, name: 'Warrior', alphaAcids: 17.7, time: 60 };
    const hopTwo = { amount: 3, name: 'Sabro', alphaAcids: 15, time: 0 };
    const wrapper = getMountedComponent();
    wrapper.vm.hops.push(hopOne);
    wrapper.vm.hops.push(hopTwo);
    wrapper.vm.removeHop(0);
    expect(wrapper.vm.hops).toEqual(expect.arrayContaining([ hopTwo ]));
  });

  it('emits correct event when commit is called', () => {
    const wrapper = getMountedComponent();
    wrapper.vm.save();
    expect(wrapper.emitted().saved).toBeTruthy();
    expect(wrapper.emitted().saved[0]).toEqual([ recipe ]);
  });
});
