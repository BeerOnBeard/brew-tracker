const MongoClient = require('mongodb').MongoClient;
const convertBrew = require('./convert');

const v0MongoConnectionString = process.env.BT_V0_MONGO;
const v0MongoDatabaseName = process.env.BT_V0_MONGO_DBNAME;
const v0MongoCollectionName = 'brews';
const v1MongoConnectionString = process.env.BT_V1_MONGO;
const v1MongoDatabaseName = process.env.BT_V1_MONGO_DBNAME;
const v1MongoCollectionName = 'brews';

if (!v0MongoConnectionString || !v0MongoDatabaseName || !v1MongoConnectionString || !v1MongoDatabaseName) {
  throw new Error('A required environment variable is missing. Please define all of the following: BT_V0_MONGO, BT_V0_MONGO_DBNAME, BT_V1_MONGO, BT_V1_MONGO_DBNAME.');
}

(async () => {
  const v0Client = new MongoClient(v0MongoConnectionString, { useUnifiedTopology: true });
  const v1Client = new MongoClient(v1MongoConnectionString, { useUnifiedTopology: true });

  try {
    await v0Client.connect();
    await v1Client.connect();

    const v0Database = v0Client.db(v0MongoDatabaseName);
    const v1Database = v1Client.db(v1MongoDatabaseName);
    const v0Brews = v0Database.collection(v0MongoCollectionName);
    const v1Brews = v1Database.collection(v1MongoCollectionName);

    const v0Cursor = v0Brews.find();
    while (await v0Cursor.hasNext()) {
      const brew = await v0Cursor.next();
      const convertedBrew = convertBrew(brew);
      await v1Brews.insertOne(convertedBrew);
    }
  } catch (err) {
    console.error(err);
  }

  await v0Client.close();
  await v1Client.close();
})();
