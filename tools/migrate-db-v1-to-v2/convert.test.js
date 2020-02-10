const convert = require('./convert');
const brewOne = require('./brew-one');
const brewOneExpected = require('./brew-one-expected')
const brewWithoutNotes = require('./brew-without-notes');
const brewWithoutNotesExpected = require('./brew-without-notes-expected');

test('Correctly converts a brew', () => {
  const getDate = () => 'should be replaced with date of first note';
  const expectedRecipeId = 'new ID for recipe';
  const getGuid = () => expectedRecipeId;
  let result = convert(getDate, getGuid, brewOne);
  let expectedResult = brewOneExpected;
  expectedResult.brew.recipe._id = expectedRecipeId;
  expectedResult.recipe._id = expectedRecipeId;
  expect(result).toEqual(expectedResult);
});

test('Correctly converts a brew without notes', () => {
  const expectedDateStarted = 'should exist';
  const getDate = () => expectedDateStarted;
  const expectedRecipeId = 'new ID for recipe';
  const getGuid = () => expectedRecipeId;

  let result = convert(getDate, getGuid, brewWithoutNotes);
  let expectedResult = brewWithoutNotesExpected;
  expectedResult.brew.dateStarted = expectedDateStarted;
  expectedResult.brew.recipe._id = expectedRecipeId;
  expectedResult.recipe._id = expectedRecipeId;
  expect(result).toEqual(expectedResult);
});
