const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  fromLocation: Object,
  toLocation: Object,
  passengerNo: Number,
  dateTime: Date,
  tokens: Array
}, { timestamps: true });

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;