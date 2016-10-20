var mongoose = require('mongoose');

var AirportDetailSchema = new mongoose.Schema({
    id: String,
    name: String,
    group: {type: mongoose.Schema.Types.ObjectId, ref: 'AirportGroup' }
});

mongoose.model('AirportDetail', AirportDetailSchema);