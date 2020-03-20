jest.mock('./dataAccess');

import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Brew from './Brew.vue';
import { getBrew, putBrew } from './dataAccess'
import { routes } from './routing/routes';

describe('Brew', () => {
  const router = new VueRouter({ routes });
  let wrapper;
  let mockBrew;

  beforeEach(() => {
    mockBrew = {
      recipe: {
        name: 'Recipe Name'
      },
      notes: []
    };
    
    const localVue = createLocalVue();
    localVue.use(VueRouter);

    getBrew.mockClear();
    putBrew.mockClear();
    getBrew.mockResolvedValue({ brew: mockBrew });
    wrapper = shallowMount(Brew, { localVue, router });
  });

  it('will get the brew when created', () => {
    expect(wrapper.vm.brew).toEqual(mockBrew);
  });

  it('will format the title date correctly', () => {
    const value = '2020-02-02T13:00:00Z';
    const result = wrapper.vm.$options.filters.formatBrewStartedDate(value);
    expect(result).toEqual('2020-02-02');
  });

  it('will compute the notes dictionary correctly', () => {
    const typeOne = 'type one';
    const typeTwo = 'type two';
    const noteOne = { type: typeOne, text: 'text one', time: '2020-01-02' };
    const noteTwo = { type: typeOne, text: 'text two', time: '2020-01-01' };
    const noteThree = { type: typeTwo, text: 'text three', time: '2020-02-01' };
    wrapper.vm.brew.notes.push(noteOne);
    wrapper.vm.brew.notes.push(noteTwo);
    wrapper.vm.brew.notes.push(noteThree);

    expect(wrapper.vm.notesDictionary)
      .toEqual({
        'type one': [
          { ...noteTwo, moment: expect.any(Object) },
          { ...noteOne, moment: expect.any(Object) }
        ],
        'type two': [
          { ...noteThree, moment: expect.any(Object) }
        ]
      });
  });

  it('will compute the note types correctly', () => {
    wrapper.vm.brew.notes.push({ type: 'one' });
    wrapper.vm.brew.notes.push({ type: 'one' });
    wrapper.vm.brew.notes.push({ type: 'two' });
    wrapper.vm.brew.notes.push({ type: 'three' });

    expect(wrapper.vm.noteTypes).toEqual(expect.arrayContaining([ 'one', 'two', 'three' ]));
  });

  it('will add a new note correctly', async () => {
    putBrew.mockImplementation(brew => Promise.resolve({ brew }));

    const expectedType = 'expected type';
    const expectedText = 'expected text';
    wrapper.vm.note.type = expectedType;
    wrapper.vm.note.text = expectedText;
    
    await wrapper.vm.addNote();

    expect(wrapper.vm.brew.notes[0])
      .toEqual({ type: expectedType, text: expectedText, time: expect.any(String) });

    expect(putBrew).toHaveBeenCalled();
    expect(wrapper.vm.note.type).toEqual(expectedType);
    expect(wrapper.vm.note.text).toEqual('');
  });

  it('will save brix correctly', async () => {
    putBrew.mockImplementation(brew => Promise.resolve({ brew }));

    const expectedOriginalBrix = 13;
    const expectedFinalBrix = 6;
    await wrapper.vm.saveBrix({ originalBrix: expectedOriginalBrix, finalBrix: expectedFinalBrix });

    expect(putBrew).toHaveBeenCalled();
    expect(wrapper.vm.brew.originalBrix).toEqual(expectedOriginalBrix);
    expect(wrapper.vm.brew.finalBrix).toEqual(expectedFinalBrix);
  });

  it('will update the recipe correctly', async () => {
    putBrew.mockImplementation(brew => Promise.resolve({ brew }));

    const expectedRecipe = { name: 'updated '};
    await wrapper.vm.updateRecipe(expectedRecipe);

    expect(putBrew).toHaveBeenCalled();
    expect(wrapper.vm.brew.recipe).toEqual(expectedRecipe);
  });
});
