const async = require('async');
const User = require('../models/User');
const Request = require('../models/Request');
const NodeGeocoder = require('node-geocoder');

var findOthers = function(lng, lat, pger, cb) {
  var limit = 10;
  // get the max distance or set it to 2 kilometers
  var maxDistance = 2;
  // we need to convert the distance to radians
  // the raduis of Earth is approximately 6371 kilometers
  maxDistance /= 6371;
  // get coordinates [ <longitude> , <latitude> ]
  var coords = [];
  coords[0] = lng;
  coords[1] = lat;
  // passengers : {$lte: (5 - req.passenger)},
  var optimalPassengers = 5 - parseInt(pger);
  // find entries
  Request.find({
    origin: {
      loc: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: coords
          },
          $maxDistance: maxDistance
        }
      }
    },
    // find from passenger limit to taxi
    friends : { $lte: optimalPassengers },
    dateTime: { $gte: Date.now() - 5400000,
                $lte: Date.now() + 5400000}
  }).limit(limit).exec(cb);
};

/**
 * POST /search
 * Send search preference to object.
 */
exports.postRequest = (req, res, next) => {
  req.assert('origin', 'Please set origin').notEmpty();
  req.assert('destination', 'Please set destination').notEmpty();
  var options = {
    provider: 'google',
    apiKey: process.env.GEOLOCATION_KEY
  };
  var geocoder = NodeGeocoder(options);
  var add = [req.body.origin, req.body.dest];
  // Using callback
  geocoder.batchGeocode(add, function(err, data) {
    if (err) throw err;
    var originLng = data[0].value[0].longitude;
    var originLat = data[0].value[0].latitude;
    var originCoords = [originLng, originLat];
    var destLng = data[1].value[0].longitude;
    var destLat = data[1].value[0].latitude;
    var destCoords = [destLng, destLat];
    var datetime = Date.parse(req.body.datetime);
    var request = new Request({
      origin      : {
        add: req.body.origin,
        loc: {
          coordinates: originCoords
        }
      },
      dest        : {
        add: req.body.dest,
        loc: {
          coordinates: destCoords
        }
      },
      friends     : parseInt(req.body.friends),
      dateTime    : datetime
    });
    request.save(function(err, requestData){
      if(err) throw err;
      findOthers(request.origin.lng, request.origin.lat, request.friends, function(err, locations){
        if (err) {
          res.json(err).status(500);
        };
      });
      // get the new data result in model format <--- should be able to retrieve data to search input field as well
      // res.json(requestData);
      // res.redirect('/search');
      // Request.find({}, function(err, users) {
      //   if (err) throw err;
      //   // object of all the users
      //   console.log(users);
      // });
    });
  });
};

/**
 * GET /search
 * Results page.
 */
exports.getRequests = (req, res) => {
  res.render('/search', {
    title: 'Search Result',
  });
};