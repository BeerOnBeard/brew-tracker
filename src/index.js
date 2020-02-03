const express = require('express');
const app = express();
const port = 3000;

const DataAccess = require('./StaticDataAccess');
const dataAccess = new DataAccess();

app.use(express.static('public'));
app.use(express.json());

app.get('/brews', (req, res) => {
  res.json(dataAccess.getBrews());
});

app.get('/brews/:id', (req, res) => {
  let brew = dataAccess.getBrew(req.params.id);
  if (brew === undefined) {
    res.status(404).send('Not Found');
    return;
  }
  
  res.json(brew);
});

app.put('/brews/:id', (req, res) => {
  dataAccess.putBrew(req.body);
  res.end();
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
