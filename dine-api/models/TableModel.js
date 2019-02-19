const mongoose = require('mongoose')

const TableSchema = new mongoose.Schema({
  numSeats: { type: Number, required: true },
  available: { type: Boolean, default: true },
  rating: { type: Number, default: null },
  timesRated: { type: Number, default: 0 },
  reservationTs: { type: Date, default: null }
});

module.exports = mongoose.model('Table', TableSchema);
