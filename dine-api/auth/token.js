const jwt = require('jsonwebtoken');

function createAndAttachJwt(res, user) {
  const payload = { _id: user._id, username: user.username, role: user.role };
  const token = jwt.sign(payload, 'big_secret_key');  // TODO
  res.cookie('jwt', token);
}

module.exports = createAndAttachJwt;
