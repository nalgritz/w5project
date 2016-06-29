const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  origin      : [{
                  lat: Number,
                  lng: Number,}],
  dest        : [{
                  lat: Number,
                  lng: Number,}],
  friends     : Number,
  dateTime    : Date,
  user        : [{type: mongoose.Schema.ObjectId, ref: 'User'}]
}, { timestamps: true });

const Request = mongoose.model('Request', requestSchema);

module.exports = Request