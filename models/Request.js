const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  origin: String,
  dest: String,
  friends: Number,
  dateTime: Date,
  ladyOnly: Boolean,
  minPassnger: Number,
  key: String
}, { timestamps: true });

const Request = mongoose.model('Request', requestSchema);

module.exports = Request


/*
const requestSchema = new mongoose.Schema({
  origin: Object,
  dest: Object,
  friends: Number,
  dateTime: Date,
  ladyOnly: Boolean,
  minPasnger: Number,
  key: String
}, { timestamps: true });
*/