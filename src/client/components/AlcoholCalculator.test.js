import { shallowMount } from '@vue/test-utils';
import AlcoholCalculator from './AlcoholCalculator.vue';

function getMountedCalculator(propsData) {
  return shallowMount(AlcoholCalculator, { propsData });
}

describe('Alcohol Calculator', () => {
  it('returns undefined abv if no brix are provided', () => {
    expect(getMountedCalculator().vm.abv).toBeUndefined();
  });

  it('returns undefined abv if originalBrix is not provided', () => {
    expect(getMountedCalculator().vm.abv).toBeUndefined();
  });

  it('returns undefined abv if finalBrix is not provided', () => {
    expect(getMountedCalculator().vm.abv).toBeUndefined();
  });

  it.each([
    [13, 6, '6.05'],
    [11.6, 5.3, '5.44'],
    [17, 5, '10.15']
  ])('returns correct abv if original and final brix and provided', (originalBrix, finalBrix, expectedAbv) => {
    expect(getMountedCalculator({ originalBrix, finalBrix }).vm.abv).toEqual(expectedAbv);
  });

  it('emits a save event when save is called', () => {
    const originalBrix = 13;
    const finalBrix = 6;
    const wrapper = getMountedCalculator({ originalBrix });

    // emulate setting the final brix in the component
    wrapper.vm.localFinalBrix = finalBrix;

    wrapper.vm.save();

    // expect to have been emitted exactly once
    expect(wrapper.emitted().save).toHaveLength(1);
    expect(wrapper.emitted().save[0][0]).toEqual({ originalBrix, finalBrix });
  });
});
