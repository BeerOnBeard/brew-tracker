const MongoClient = require('mongodb').MongoClient;
const moment = require('moment');
const getGuid = require('uuid/v4');
const convert = require('./convert');

const v1MongoConnectionString = process.env.BT_V1_MONGO;
const v1MongoDatabaseName = process.env.BT_V1_MONGO_DBNAME;
const v1MongoCollectionName = 'brews';
const v2MongoConnectionString = process.env.BT_V2_MONGO;
const v2MongoDatabaseName = process.env.BT_V2_MONGO_DBNAME;
const v2BrewsMongoCollectionName = 'brews';
const v2RecipesMongoCollectionName = 'recipes';

if (!v1MongoConnectionString || !v1MongoDatabaseName || !v2MongoConnectionString || !v2MongoDatabaseName) {
  throw new Error('A required environment variable is missing. Please define all of the following: BT_V1_MONGO, BT_V1_MONGO_DBNAME, BT_V2_MONGO, BT_V2_MONGO_DBNAME.');
}

(async () => {
  const v1Client = new MongoClient(v1MongoConnectionString, { useUnifiedTopology: true });
  const v2Client = new MongoClient(v2MongoConnectionString, { useUnifiedTopology: true });

  try {
    await v1Client.connect();
    await v2Client.connect();

    const v1Database = v1Client.db(v1MongoDatabaseName);
    const v2Database = v2Client.db(v2MongoDatabaseName);
    const v1Brews = v1Database.collection(v1MongoCollectionName);
    const v2Brews = v2Database.collection(v2BrewsMongoCollectionName);
    const v2Recipes = v2Database.collection(v2RecipesMongoCollectionName);

    const v1Cursor = v1Brews.find();
    while (await v1Cursor.hasNext()) {
      const brew = await v1Cursor.next();
      const converted = convert(() => moment().format(), getGuid, brew);
      await v2Brews.insertOne(converted.brew);
      await v2Recipes.insertOne(converted.recipe);
    }
  } catch (err) {
    console.error(err);
  }

  await v1Client.close();
  await v2Client.close();
})();
