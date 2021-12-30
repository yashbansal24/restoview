const express = require('express');
const path = require('path'); // NEW
const cors = require('cors')

const app = express();
const port = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, '../dist'); // NEW
const HTML_FILE = path.join(DIST_DIR, 'index.html'); // NEW

app.use(express.json())

const JSONdb = require('simple-json-db');
const db = new JSONdb('./db.json');


app.use(express.static(DIST_DIR)); // NEW

app.get('/', (req, res) => {
 res.sendFile(HTML_FILE); // EDIT
});

app.use(cors());

app.post('/api/login', (req, res) => {
  const users = db.get('users');
  if (users.some((user) => user.username === req.body.username && req.body.password === user.password)) {
    res.send({
      token: Date.now()
    });
  }
  else {
    res.status(403).send({
      success: false
    });
  }
});

app.post('/api/signup', (req, res) => {
  const users = db.get('users')||[];
  users.push(req.body);
  db.set('users', users);
  res.send({
    success: true
  });
});

app.listen(port, function () {
  console.log('App listening on port: ' + port);
 });
 