const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  id: Number,
  origin      : {
    add: String,
    loc: {
      'type': {type: String, enum: "Point", default: "Point"},
      coordinates: {
        type: Array
      }
    }
  },
  dest        : {
    add: String,
    loc: {
      'type': {type: String, enum: "Point", default: "Point"},
      coordinates: {
        type: Array
      }
    }
  },
  friends     : Number,
  dateTime    : Date,
  user        : [{type: mongoose.Schema.ObjectId, ref: 'User'}]
}, { timestamps: true });

requestSchema.index({loc: '2dsphere'});

const Request = mongoose.model('Request', requestSchema);



module.exports = Request;