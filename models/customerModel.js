const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  table: { type: mongoose.Schema.Types.ObjectId, ref: 'Table', default: null }
});

module.exports = mongoose.model('Customer', CustomerSchema);
