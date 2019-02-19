const express = require('express');
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const tableRoutes = require('./routes/tables');
const userRoutes = require('./routes/user');

require('./auth/strategies');

const api = express.Router();

api.use('/register', registerRoutes);
api.use('/login', loginRoutes);
api.use('/user', userRoutes);
api.use(tableRoutes);

api.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

module.exports = api;
