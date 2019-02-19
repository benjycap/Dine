const express = require('express');
const passport = require('passport');
const Restaurants = require('../models/restaurantModel');
const Customers = require('../models/customerModel');
const createAndAttachJwt = require('../auth/token');

const router = express.Router();

router.post('/restaurant', passport.authenticate('register', { session: false }), async (req, res, next) => {
  try {
    const { name, location } = req.body;
    await Restaurants.create({ user: req.user._id, name, location });
  } catch (e) { return next(e); }
  createAndAttachJwt(res, req.user) 
  res.send({ username: req.user.username, role: req.user.role });
});

router.post('/customer', passport.authenticate('register', { session: false }), async (req, res, next) => {
  try {
    await Customers.create({ user: req.user._id });
  } catch (e) { return next(e); }
  createAndAttachJwt(res, req.user) 
  res.send({ username: req.user.username, role: req.user.role });
});

module.exports = router;
