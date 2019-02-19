const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    username: req.user.username,
    role: req.user.role
  });
})

module.exports = router;
