var mongoose = require('mongoose');

var BookingSchema = new mongoose.Schema({
    id: String,
    day: Date,
    price: Number,
    status: Number,
    flightDetails: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FlightDetail' }],
    passengers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Passenger' }]
});

mongoose.model('Booking', BookingSchema);