const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const roles = require('../enum/roles');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true 
  },
  role: {
    type: Number,
    enum: [roles.Restaurant, roles.Customer],
    required: true
  }
});

UserSchema.pre('save', async function(next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.isValidPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);
