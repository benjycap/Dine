const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const next = require('next');
const apiRoutes = require('./dine-api/api');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

Promise.all([
  mongoose.connect('mongodb://localhost/dine'),
  app.prepare()
]).then(() => {
  const server = express();

  server.use(cookieParser());
  server.use(express.json());
  
  server.use('/api', apiRoutes)

  server.get('*', (req, res) => handle(req, res));

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
}).catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});

