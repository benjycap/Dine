const express = require('express');
const passport = require('passport');
const getJwt = require('../auth/token');

const router = express.Router();

router.post('/', async (req, res, next) => {
  passport.authenticate('login', async (authErr, user) => {
    if (authErr) return next(authErr);
    if (!user) return next(new Error('User not found'))
    try {
      res.json({ token: getJwt(user) });
    } catch (e) {
      return next(e);
    }
  })(req, res, next);
});

module.exports = router;
