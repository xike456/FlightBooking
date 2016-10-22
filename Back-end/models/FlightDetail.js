var mongoose = require('mongoose');

var FlightDetailSchema = new mongoose.Schema({
    flightId: String,
    seat: String,
    price: Number,
    day: Date,
    booking: {type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }
});

mongoose.model('FlightDetail', FlightDetailSchema);