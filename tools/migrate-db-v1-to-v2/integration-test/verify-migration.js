const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const brewOneExpected = require('../brew-one-expected');
const brewWithoutNotesExpected = require('../brew-without-notes-expected');

const mongoConnectionString = process.env.BT_V2_MONGO;
const mongoDatabaseName = process.env.BT_V2_MONGO_DBNAME;
const brewsMongoCollectionName = 'brews';
const recipesMongoCollectionName = 'recipes';

async function assertExpectations(expected, brewsCollection, recipesCollection) {
  let brew = await brewsCollection.findOne({ _id: expected.brew._id });
  assert.notEqual(brew, undefined);

  const recipeId = brew.recipe._id;
  assert.notEqual(recipeId, undefined);

  // we've tested that the recipe _id exists and will test that a recipe exists with that _id below
  delete brew.recipe._id;

  // unit tests cover expectations over date started. There's no need to have that complexity here
  delete brew.dateStarted;
  delete expected.brew.dateStarted;
  assert.deepStrictEqual(brew, expected.brew);

  let recipe = await recipesCollection.findOne({ _id: recipeId });

  // we've already tested that the recipe _id exists and is correct
  delete recipe._id;
  assert.deepStrictEqual(recipe, expected.recipe);
}

(async () => {
  if (!mongoConnectionString || !mongoDatabaseName) {
    throw new Error('A required environment variable is missing. Please define all of the following: BT_V2_MONGO, BT_V2_MONGO_DBNAME.');
  }

  const client = new MongoClient(mongoConnectionString, { useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db(mongoDatabaseName);
    const brews = database.collection(brewsMongoCollectionName);
    const recipes = database.collection(recipesMongoCollectionName);

    await assertExpectations(brewOneExpected, brews, recipes);
    await assertExpectations(brewWithoutNotesExpected, brews, recipes);
  } catch (err) {
    console.error(err);
  }

  await client.close();
})();
