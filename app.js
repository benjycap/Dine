const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const apiRoutes = require('./routes/api');

require('./auth/strategies');

const app = express();

app.use(bodyParser.urlencoded());

app.use('/register', registerRoutes);
app.use('/login', loginRoutes);
app.use('/api', apiRoutes);

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

// debug
// app.get('/drop', (req, res) => mongoose.connection.db.dropDatabase().then(() => res.send('db dropped')));

mongoose.connect('mongodb://localhost/dine').then(() => {
  app.listen(3000, () => {
    console.log('Server started on http://localhost:3000')
  });
});
