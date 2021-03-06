var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');


var AirportGroup = mongoose.model('AirportGroup');
var AirportDetail = mongoose.model('AirportDetail');
var Flight = mongoose.model('Flight');
var Booking = mongoose.model('Booking');
var FlightDetail = mongoose.model('FlightDetail');
var Passenger = mongoose.model('Passenger');
var Admin = mongoose.model('Admin');

//============================================================
//============ Admin Authenticate ============================

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/admin', function (req, res, next) {
    console.log(req.headers);
    var token = req.headers['x-access-token'];

    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, 'admintoken', function (err, decoded) {
            if (err) {
                return res.json({success: false, message: 'Failed to authenticate token.'});
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {
        return res.json({
            success: false,
            message: 'No token provided.'
        });
    }
});
//=============================================================================
router.get('/api/airportgroups', function (req, res, next) {
  AirportGroup.find().populate({path: 'airports'}).exec(function (err, result) {
    if(err){return next(err);}
    res.json(result);
  });
});

router.post('/api/airportgroups', function (req, res, next) {
  var group = new AirportGroup(req.body);

  group.save(function (err, group) {
    if(err){return next(err);}
    res.json(group);
  })
});

router.param('group', function (req, res, next, id) {
  var query = AirportGroup.findById(id);

  query.exec(function (err, group) {
    if(err){return next(err);}
    if(!group){ return next(new Error("Cant find group"))}
    req.group = group;
    return next();
  })
});

router.delete('/api/airportgroups/:group', function (req, res, next) {
    req.group.remove(function (err) {
        if(err) {return next(err);}
        res.json('done');
    })
});

router.get('/api/airportgroups/:group', function (req, res, next) {
  req.group.populate('airports', function (err, group) {
    if(err){ return next(err);}
    res.json(req.group);
  })
});

router.post('/api/airportgroups/:group/airports', function (req, res, next) {
  var airport = new AirportDetail(req.body);
  airport.group = req.group;

  airport.save(function (err, airport) {
    if(err){return next(err);}
    req.group.airports.push(airport);
    req.group.save(function (err, group) {
      if(err){return next(err);}
      res.json(airport);
    })
  })
});
//====================================================================================
router.get('/api/raw-flights', function (req, res, next) {
  Flight.find(function (err, flights) {
    if(err){return next(err);}
    res.json(flights);
  })
});

router.post('/admin/flights', function (req, res, next) {
  var flight = new Flight(req.body);

  flight.save(function (err, flight) {
    if(err) {return next(err);}
    res.json(flight);
  })
});


// API
//--------- Get list airports--------------------------------------
router.get('/api/start-airports', function (req, res, next) {
  AirportGroup.find().populate('airports').exec(function (err, result) {
    if(err){return next(err);}
    res.json(result);
  });
});

//---------- Get destination --------------------------------------
router.get('/api/end-airports', function (req, res, next) {
  Flight.find({startPos: req.query.startPos}, {endPos: 1}, function (err, airports) {
    var arr = [];
    for (var x in airports){
      arr.push(airports[x].endPos);
    }
    AirportGroup.find().populate({
      path: 'airports',
      match: {id: {$in : arr}}
    }).exec(function (err, endAirports) {
      res.json(endAirports);
    })
  })
});

//------------- Search For Flight ------------------------------------

router.get('/api/flights',  function (req, res, next) {
    var start = req.query.start;
    var end = req.query.end;
    var dayStart = new Date(req.query.dayStart);
    var seat = req.query.seat;
    var price = req.query.price;
    var amount = req.query.amount;
    var list = [];
    Flight.find({
        startPos: start,
        endPos: end,
        day: {$gte: req.query.dayStart, $lt: dayStart.setDate(dayStart.getDate()+1)},
        seatClass: seat,
        priceClass: price,
        amount: {$gt: amount}
        }, function (err, flights) {
            console.log('start: ' + flights);
            list.push(flights);
            if(req.query.dayEnd){
                var dayEnd = new Date(req.query.dayEnd);
                Flight.find({
                    startPos: end,
                    endPos: start,
                    day: {$gte: req.query.dayEnd, $lt: dayEnd.setDate(dayEnd.getDate()+1)},
                    seatClass: seat,
                    priceClass: price,
                    amount: {$gt: amount}
                }, function (err, flights) {
                    console.log('end; ' + flights);
                    list.push(flights);
                    res.json(list);
                })
            }
    });
});

//-------------- Create Booking -------------------------------------------
router.post('/api/bookings', function (req, res, next) {
    var id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 6).toUpperCase();
    while(Booking.find({id: id}).length ==0) {
        id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 6).toUpperCase();
    }
    var booking = new Booking(req.body);
    booking.id = id;
    booking.status = 0;
    booking.price = 0;
    booking.save(function (err, booking) {
        if(err){return next(err)}
        res.json(booking);
    })
});
router.get('/api/bookings', function (req, res, next) {
    Booking.find(function (err, bookings) {
        if(err){return next(err)}
        res.json(bookings);
    })
});

router.param('booking', function (req, res, next, id) {
    var query = Booking.findById(id);
    query.exec(function (err, booking) {
        if(err){return next(err)}
        if(!booking){return next(new Error("cant find booking"))}
        req.booking = booking;
        return next();
    })
});

router.get('/api/bookings/:booking', function (req, res, next) {
    req.booking.populate(['flightDetails', 'passengers'], function (err, result) {
        if(err){return next(err)}
        res.json(result);
    })
});

router.post('/api/bookings/:booking/flights', function (req, res, next) {
    var flight = new FlightDetail(req.body);
    flight.booking = req.booking;
    flight.save(function (err, flight) {
        if(err){return next(err)}
        req.booking.flightDetails.push(flight);
        req.booking.save(function (err, booking) {
            if(err){return next(err)}
            res.json(booking);
        })
    })
});

router.delete('/api/bookings/:booking', function (req, res, next) {
    req.booking.remove(function (err, result) {
        res.json('success');
    })
});

router.get('/api/flights-details', function (req, res, next) {
    FlightDetail.find(function (err, result) {
        if(err){return next(err)}
        res.json(result);
    })
});

router.post('/api/bookings/:booking/passengers', function (req, res, next) {
    var passenger = new Passenger(req.body);
    passenger.booking = req.booking;
    passenger.save(function (err, passenger) {
        if(err) {return next(err)}
        req.booking.passengers.push(passenger);
        req.booking.save(function (err, booking) {
            if(err){return next(err)}
            res.json(booking);
        })
    })
});

router.patch('/api/bookings/:booking', function (req, res, next) {
    var money = 0;
    req.booking.populate(['flightDetails', 'passengers'], function (err, result) {
        if(err){return next(err)}
        result.flightDetails.forEach(function (flight) {
            money += (flight.price * result.passengers.length);
            console.log('price: ' + flight.price + ' n: ' + result.passengers.length + ' mongey: ' + money);
        });
    });
    setTimeout(function () {
        req.booking.update({status: 1, price: money}, function (err, booking) {
            if(err){return next(err)}
            res.json(booking);
        })
    }, 500);
});



router.get('/create', function (req, res, next) {
    var admin = new Admin();
    admin.username = 'sa';
    admin.password = 'password';

    admin.save(function(err) {
        if (err) throw err;

        console.log('User saved successfully');
        res.json({ success: true });
    });
});


router.get('/admin/bookings', function (req, res, next) {
    Booking.find({id: req.query.id}).populate(['flightDetails', 'passengers']).exec(function (err, result) {
        res.json(result)
    })
});

router.post('/authenticate', function(req, res) {

    // find the user
    Admin.findOne({
        username: req.body.username
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            // check if password matches
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {

                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, 'admintoken', {
                    expiresIn: 60*5 // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }

        }

    });
});



module.exports = router;
