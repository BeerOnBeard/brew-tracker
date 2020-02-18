const MongoClient = require('mongodb').MongoClient;
const convert = require('./convert');

const v2MongoConnectionString = process.env.BT_V2_MONGO;
const v2MongoDatabaseName = process.env.BT_V2_MONGO_DBNAME;
const v2BrewsMongoCollectionName = 'brews';
const v2RecipesMongoCollectionName = 'recipes';
const v3MongoConnectionString = process.env.BT_V3_MONGO;
const v3MongoDatabaseName = process.env.BT_V3_MONGO_DBNAME;
const v3BrewsMongoCollectionName = 'brews';
const v3RecipesMongoCollectionName = 'recipes';

if (!v2MongoConnectionString || !v2MongoDatabaseName || !v3MongoConnectionString || !v3MongoDatabaseName) {
  throw new Error('A required environment variable is missing. Please define all of the following: BT_V2_MONGO, BT_V2_MONGO_DBNAME, BT_V3_MONGO, BT_V3_MONGO_DBNAME.');
}

(async () => {
  const v2Client = new MongoClient(v2MongoConnectionString, { useUnifiedTopology: true });
  const v3Client = new MongoClient(v3MongoConnectionString, { useUnifiedTopology: true });

  try {
    await v2Client.connect();
    await v3Client.connect();

    const v2Database = v2Client.db(v2MongoDatabaseName);
    const v3Database = v3Client.db(v3MongoDatabaseName);
    const v2Brews = v2Database.collection(v2BrewsMongoCollectionName);
    const v2Recipes = v2Database.collection(v2RecipesMongoCollectionName);
    const v3Brews = v3Database.collection(v3BrewsMongoCollectionName);
    const v3Recipes = v3Database.collection(v3RecipesMongoCollectionName);

    const v2BrewsCursor = v2Brews.find();
    while (await v2BrewsCursor.hasNext()) {
      const brew = await v2BrewsCursor.next();
      const converted = convert(brew);
      await v3Brews.insertOne(converted);
    }

    const v2RecipesCursor = v2Recipes.find();
    while (await v2RecipesCursor.hasNext()) {
      const recipe = await v2RecipesCursor.next();
      const converted = convert(recipe);
      await v3Recipes.insertOne(converted);
    }
  } catch (err) {
    console.error(err);
  }

  await v2Client.close();
  await v3Client.close();
})();
