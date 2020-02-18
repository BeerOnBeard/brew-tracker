const convert = require('./convert');
const brewOne = require('./brew-one');
const brewOneExpected = require('./brew-one-expected');

test('Adds a version to the document', () => {
  let result = convert(brewOne);
  expect(result).toEqual(brewOneExpected);
});
