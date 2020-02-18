const MongoClient = require('mongodb').MongoClient;
const brewOne = require('../brew-one');
const brewTwo = require('../brew-two');
const recipeOne = require('../recipe-one');
const recipeTwo = require('../recipe-two');

const mongoConnectionString = process.env.BT_V2_MONGO;
const mongoDatabaseName = process.env.BT_V2_MONGO_DBNAME;
const brewsMongoCollectionName = 'brews';
const recipesMongoCollectionName = 'recipes';

(async () => {
  if (!mongoConnectionString || !mongoDatabaseName) {
    throw new Error('A required environment variable is missing. Please define all of the following: BT_V2_MONGO, BT_V2_MONGO_DBNAME.');
  }

  const client = new MongoClient(mongoConnectionString, { useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db(mongoDatabaseName);

    const brews = database.collection(brewsMongoCollectionName);
    await brews.findOneAndReplace({ _id: brewOne._id }, brewOne, { upsert: true });
    await brews.findOneAndReplace({ _id: brewTwo._id }, brewTwo, { upsert: true });

    const recipes = database.collection(recipesMongoCollectionName);
    await recipes.findOneAndReplace({ _id: recipeOne._id }, recipeOne, { upsert: true });
    await recipes.findOneAndReplace({ _id: recipeTwo._id }, recipeTwo, { upsert: true });
  } catch (err) {
    console.error(err);
  }

  await client.close();
})();
