import deepCopy from './deepCopy';

describe('Deep Copy Tests', () => {
  it('Should copy props', () => {
    const originalValue = 'originalValue';
    const input = { prop1: 'value1', prop2: originalValue };
    const output = deepCopy(input);
    expect(output).toEqual(input);

    // output modification should not modify input
    output.prop2 = 'newValue';
    expect(input.prop2).toEqual(originalValue);
  });

  it('Should copy arrays in an object', () => {
    const input = { items: [ 1, 2, 3 ] };
    const output = deepCopy(input);
    expect(output).toEqual(input);

    // output modification should not modify input
    output.items.pop();
    expect(input.items.length).toEqual(3);
  });

  it('Should copy nested objects', () => {
    const originalValue = 'originalValue';
    const input = { prop: { nestedProp1: 'nestedValue1', nestedProp2: originalValue } };
    const output = deepCopy(input);
    expect(output).toEqual(input);

    // output modification should not modify input
    output.prop.nestedProp2 = 'newValue';
    expect(input.prop.nestedProp2).toEqual(originalValue);
  });

  it('Should copy an object containing an array containing objects', () => {
    const originalValue = 'originalValue';
    const input = { prop: [ { nestedProp: originalValue } ] };
    const output = deepCopy(input);
    expect(output).toEqual(input);

    // output modification should not modify input
    output.prop[0].nestedProp = 'newValue';
    expect(input.prop[0].nestedProp).toEqual(originalValue);
  });
});
