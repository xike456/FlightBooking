var mongoose = require('mongoose');

var BookingSchema = new mongoose.Schema({
    id: String,
    day: Date,
    price: Number,
    status: Number
});

mongoose.model('Booking', BookingSchema);