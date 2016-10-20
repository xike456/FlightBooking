var mongoose = require('mongoose');

var AirportGroupSchema = new mongoose.Schema({
    group: String,
    airports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AirportDetail' }]
});

mongoose.model('AirportGroup', AirportGroupSchema);