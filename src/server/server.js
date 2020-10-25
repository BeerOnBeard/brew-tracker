const port = 3000;
const documentOutOfDateCode = 'DOCUMENT_OUT_OF_DATE';

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const mongoDataAccess = require('./mongoDataAccess');

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
  const dataAccess = mongoDataAccess(db);
  const app = createExpressApplication(dataAccess);

  const server = app.listen(port, () => console.log(`Listening on port ${port}...`));
  registerShutdownHandlers(server);
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

    const response = await dataAccess.putRecipe(recipe);
    if (response.err && response.err === dataAccess.documentOutOfDateError) {
      res.statusMessage = documentOutOfDateCode;
      res.status(400).json(response.recipe);
      return;
    } else if (response.err) {
      console.err(response);
      res.status(500).end();
      return;
    }

    res.status(201).json(response.recipe);
  });

  // expecting /brews?recipeId={GUID}
  app.get('/brews', async (req, res) => {
    let brews = await dataAccess.getBrews(req.query.recipeId);
    res.json(brews);
  });

  app.get('/recent-brews', async (req, res) => {
    let brews = await dataAccess.getRecentBrews();
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

    const response = await dataAccess.putBrew(brew);
    if (response.err && response.err === dataAccess.documentOutOfDateError) {
      res.statusMessage = documentOutOfDateCode;
      res.status(400).json(response.brew);
      return;
    } else if (response.err) {
      console.err(response);
      res.status(500).end();
      return;
    }

    res.status(201).json(response.brew);
  });

  return app;
}

// expects an http.Server
function registerShutdownHandlers(server) {
  const exit = () => {
    server.close(err => {
      if (err) {
        console.error(err);
        process.exitCode = 1;
      }

      process.exit();
    });
  }

  // SIGINT from CTRL+C
  process.on('SIGINT', () => {
    console.log('Received SIGNINT. Shutting down.');
    exit();
  });

  // SIGTERM from docker stop
  process.on('SIGTERM', () => {
    console.log('Received SIGTERM. Shutting down.');
    exit();
  });
}
