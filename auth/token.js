const jwt = require('jsonwebtoken');

function getJwt(user) {
  const payload = { _id: user._id, username: user.username, role: user.role };
  return jwt.sign(payload, 'big_secret_key');  // TODO
}

module.exports = getJwt;
