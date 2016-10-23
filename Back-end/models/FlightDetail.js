var mongoose = require('mongoose');

var FlightDetailSchema = new mongoose.Schema({
    id: String,
    day: Date,
    seatClass: String,
    priceClass: String,
    price: Number,
    booking: {type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }
});

mongoose.model('FlightDetail', FlightDetailSchema);