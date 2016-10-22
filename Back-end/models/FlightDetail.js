var mongoose = require('mongoose');

var FlightDetailSchema = new mongoose.Schema({
    flightId: String,
    seat: String,
    price: String,
});

mongoose.model('FlightDetail', FlightDetailSchema);