const MongoClient = require('mongodb').MongoClient;
const brewOne = require('./test-brew-one');
const brewTwo = require('./test-brew-two');

const mongoConnectionString = process.env.BT_V0_MONGO;
const mongoDatabaseName = process.env.BT_V0_MONGO_DBNAME;
const mongoCollectionName = process.env.BT_V0_MONGO_COLLECTION;

(async () => {
  if (!mongoConnectionString || !mongoDatabaseName || !mongoCollectionName) {
    throw new Error('A required environment variable is missing. Please define all of the following: BT_V0_MONGO, BT_V0_MONGO_DBNAME, BT_V0_MONGO_COLLECTION.');
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
