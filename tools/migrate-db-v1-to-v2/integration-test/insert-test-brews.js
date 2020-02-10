const MongoClient = require('mongodb').MongoClient;
const brewOne = require('../brew-one');
const brewTwo = require('../brew-without-notes');

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

    await brews.findOneAndReplace({ _id: brewOne._id }, brewOne, { upsert: true });
    await brews.findOneAndReplace({ _id: brewTwo._id }, brewTwo, { upsert: true });
  } catch (err) {
    console.error(err);
  }

  await client.close();
})();
