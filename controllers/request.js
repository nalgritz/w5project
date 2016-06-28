const async = require('async');
const User = require('../models/User');
const Request = require('../models/Request');
const requestMod = require('request');

/**
 * POST /search
 * Send search preference to object.
 */

exports.postRequest = (req, res, next) => {
  req.assert('origin', 'Please set origin').notEmpty();
  req.assert('destination', 'Please set destination').notEmpty();
  var request = new Request({
    origin    : req.body.origin,
    dest      : req.body.destination,
    friends   : req.body.friends,
    datetime  : req.body.datetime,
    ladyOnly  : false,
    minPassnger: 0,
    key       : process.env.GEOLOCATION_KEY
  });
  request.save(function(err, data){
    res.json(data);
  });
};

var compareRequest = function () {

}

/**
 * GET /search
 * Results page.
 */
exports.getRequests = (req, res) => {
  res.render('search', {
    title: 'Search Result'
  });
};

/*
Pseudo code - get data Algorithm
1.1 Passengers
1.2


Pseudo code - Search result
1.1 get Request.find('')
1.2 passengers : $lt: (5 - req.passenger),
1.3
var walkingDistance = 0.0065
origin& destination:
$gt: (lat&lng - walkingDistance)
$lt: (lat&lng + walkingDistance)
1.4
dateTime:
$gt: (dateTime - 108000000)
$lt: (dateTime + 108000000)
1.5
match minPassnger
1.6
match ladyOnly

*/