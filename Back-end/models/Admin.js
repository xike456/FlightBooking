var mongoose = require('mongoose');

var AdminSchema = new mongoose.Schema({
    username: String,
    password: String
});

mongoose.model('Admin', AdminSchema);