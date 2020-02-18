const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const brewOneExpected = require('../brew-one-expected');
const brewTwoExpected = require('../brew-two-expected');
const recipeOneExpected = require('../recipe-one-expected');
const recipeTwoExpected = require('../recipe-two-expected');

const mongoConnectionString = process.env.BT_V3_MONGO;
const mongoDatabaseName = process.env.BT_V3_MONGO_DBNAME;
const brewsMongoCollectionName = 'brews';
const recipesMongoCollectionName = 'recipes';

(async () => {
  if (!mongoConnectionString || !mongoDatabaseName) {
    throw new Error('A required environment variable is missing. Please define all of the following: BT_V3_MONGO, BT_V3_MONGO_DBNAME.');
  }

  const client = new MongoClient(mongoConnectionString, { useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db(mongoDatabaseName);
    const brews = database.collection(brewsMongoCollectionName);
    const recipes = database.collection(recipesMongoCollectionName);

    const brewOne = await brews.findOne({ _id: brewOneExpected._id });
    assert.deepStrictEqual(brewOne, brewOneExpected);

    const brewTwo = await brews.findOne({ _id: brewTwoExpected._id });
    assert.deepStrictEqual(brewTwo, brewTwoExpected);

    const recipeOne = await recipes.findOne({ _id: recipeOneExpected._id });
    assert.deepStrictEqual(recipeOne, recipeOneExpected);

    const recipeTwo = await recipes.findOne({ _id: recipeTwoExpected._id });
    assert.deepStrictEqual(recipeTwo, recipeTwoExpected);
  } catch (err) {
    console.error(err);
  }

  await client.close();
})();
