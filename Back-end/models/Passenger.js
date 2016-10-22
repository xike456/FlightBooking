var mongoose = require('mongoose');

var PassengerSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    booking: {type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }
});

mongoose.model('Passenger', PassengerSchema);