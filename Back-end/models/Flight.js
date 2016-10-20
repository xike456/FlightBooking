var mongoose = require('mongoose');

var FlightSchema = new mongoose.Schema({
    id: String,
    startPos: String,
    endPos: String,
    day: Date,
    seatClass: String,
    priceClass: String,
    amount: Number,
    price: Number
});

mongoose.model('Flight', FlightSchema);