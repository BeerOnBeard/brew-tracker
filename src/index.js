const express = require('express');
const app = express();
const port = 3000;

const dataAccess = require('./brewsStaticDataAccess');

app.use(express.static('public'));

app.get('/brews', (req, res) => {
  res.send(dataAccess.getBrews());
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
