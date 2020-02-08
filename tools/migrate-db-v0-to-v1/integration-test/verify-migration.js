const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const expectedBrewOne = require('./expected-brew-one');
const expectedBrewTwo = require('./expected-brew-two');

const mongoConnectionString = process.env.BT_V1_MONGO;
const mongoDatabaseName = process.env.BT_V1_MONGO_DBNAME;
const mongoCollectionName = 'brews';

(async () => {
  if (!mongoConnectionString || !mongoDatabaseName) {
    throw new Error('A required environment variable is missing. Please define all of the following: BT_V1_MONGO, BT_V1_MONGO_DBNAME.');
  }

  const client = new MongoClient(mongoConnectionString, { useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db(mongoDatabaseName);
    const brews = database.collection(mongoCollectionName);

    let brewOne =  await brews.findOne({ _id: expectedBrewOne._id });
    let brewTwo =  await brews.findOne({ _id: expectedBrewTwo._id });

    assert.deepStrictEqual(brewOne, expectedBrewOne);
    assert.deepStrictEqual(brewTwo, expectedBrewTwo);
  } catch (err) {
    console.error(err);
  }

  await client.close();
})();
