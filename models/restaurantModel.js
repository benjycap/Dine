const mongoose = require('mongoose')

const RestaurantSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tables: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Table' }],
  name: { type: String, default: 'Unknown' },
  location: String
});

RestaurantSchema.methods.ownsTable = function(tableId) {
  // loose equality for type coercion
  return this.tables.some(id => id == tableId);
}

module.exports = mongoose.model('Restaurant', RestaurantSchema);
