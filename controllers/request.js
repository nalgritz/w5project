const async = require('async');
const User = require('../models/User');
const Request = require('../models/Request');
const requestMod = require('request');

var compareRequest = function (e) {

// Pseudo code - Search result
// 1.1 get Request.find('')
// 1.2 passengers : $lt: (5 - req.passenger),
// 1.3
// var walkingDistance = 0.0065
// origin& destination:
// $gt: (lat&lng - walkingDistance)
// $lt: (lat&lng + walkingDistance)
// 1.4
// dateTime:
// $gt: (dateTime - 108000000)
// $lt: (dateTime + 108000000)
// 1.7

};

/**
 * POST /search
 * Send search preference to object.
 */
exports.postRequest = (req, res, next) => {
  req.assert('origin', 'Please set origin').notEmpty();
  req.assert('destination', 'Please set destination').notEmpty();
  var request = new Request({
    origin      : req.body.origin,
    dest        : req.body.dest,
    friends     : parseInt(req.body.friends),
    datetime    : req.body.datetime,
  });
  request.save(function(err){
    if(err) throw err;
    {};
    res.redirect('search');
  });
};

/**
 * GET /search
 * Results page.
 */
exports.getRequests = (req, res) => {
  res.render('search', {
    title: 'Search Result'
  });
  // get all the users
  Request.find({}, function(err, users) {
    if (err) throw err;
    // object of all the users
    console.log(users);

  });
};

// exports.findLocation = function(req, res, next) {
//   var limit = req.query.limit || 10;
//   var maxDistance = req.query.distance || 2;
//   maxDistance /= 6371;
//   // get coordinates [ <longitude> , <latitude> ]
//   var coords = [];
//   coords[0] = req.query.longitude || 0;
//   coords[1] = req.query.latitude || 0;
//   // find a location
//   Location.find({
//     loc: {
//       $near: coords,
//       $maxDistance: maxDistance
//     }
//   }).limit(limit).exec(function(err, locations) {
//     if (err) {
//       return res.json(500, err);
//     }
//     res.json(200, locations);
//   });
// };