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

const client = MongoClient(mongoConnectionString, { useUnifiedTopology: true });
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

  app.get('/recipes', async (req, res) => {
    let recipes = await dataAccess.getRecipes();
    res.json(recipes);
  });

  app.get('/recipes/:id', async (req, res) => {
    let recipe = await dataAccess.getRecipe(req.params.id);
    if (recipe === undefined) {
      res.status(404).send('Not Found');
      return;
    }

    res.json(recipe);
  });

  app.put('/recipes/:id', async (req, res) => {
    let recipe = { ...req.body };
    if (recipe._id !== req.params.id) {
      res.status(400).send('Identifier in URI does not match identifier in object.');
      return;
    }

    await dataAccess.putRecipe(recipe);
    res.status(201).end();
  })

  // expecting /brews?recipeId={GUID}
  app.get('/brews', async (req, res) => {
    let brews = await dataAccess.getBrews(req.query.recipeId);
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
