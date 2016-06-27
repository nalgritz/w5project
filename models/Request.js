const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  origin: Object,
  dest: Object,
  friends: Number,
  dateTime: Date,
  token: Array
}, { timestamps: true });

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;