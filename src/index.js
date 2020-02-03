const port = 3000;

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const DataAccess = require('./MongoDataAccess');

const mongoConnectionString = process.env.BT_MONGO;
const mongoDatabaseName = process.env.BT_MONGO_DBNAME;

if (!mongoConnectionString) {
  throw new Error('Mongo connection string not specified. Declare environment variable BT_MONGO.');
}

if (!mongoDatabaseName) {
  throw new Error('Mongo database name not specified. Declare environment variable BT_MONGO_DBNAME.')
}

const client = MongoClient(mongoConnectionString);
client.connect((err, client) => {
  if (err) {
    throw err;
  }

  let db = client.db(mongoDatabaseName);
  const dataAccess = new DataAccess(db);
  const app = createExpressApplication(dataAccess);

  app.listen(port, () => console.log(`Listening on port ${port}...`));
});

function createExpressApplication(dataAccess) {
  const app = express();
  app.use(express.static('public'));
  app.use(express.json());

  app.get('/brews', async (req, res) => {
    let brews = await dataAccess.getBrews();
    res.json(brews);
  });
  
  app.get('/brews/:id', async (req, res) => {
    let brew = await dataAccess.getBrew(req.params.id);
    if (brew === undefined) {
      res.status(404).send('Not Found');
      return;
    }
    
    res.json(brew);
  });
  
  app.put('/brews/:id', async (req, res) => {
    let brew = { ...req.body };
    if (brew._id !== req.params.id) {
      res.status(400).send('Identifier in URI does not match identifier in object.');
      return;
    }

    await dataAccess.putBrew(brew);
    res.status(201).end();
  });

  return app;
}
