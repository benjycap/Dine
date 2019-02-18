const express = require('express');
const passport = require('passport');
const Restaurants = require('../models/restaurantModel');
const Customers = require('../models/customerModel');
const getJwt = require('../auth/token');

const router = express.Router();

router.post('/restaurant', passport.authenticate('register', { session: false }), async (req, res, next) => {
  try {
    await Restaurants.create({ user: req.user._id });
  } catch (e) { return next(e); }
  res.json({ token: getJwt(req.user) });
});

router.post('/customer', passport.authenticate('register', { session: false }), async (req, res, next) => {
  try {
    await Customers.create({ user: req.user._id });
  } catch (e) { return next(e); }
  res.json({ token: getJwt(req.user) });
});

module.exports = router;
