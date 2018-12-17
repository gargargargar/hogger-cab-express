//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Googleuser = require('./googleuser');

//inherits Googleuser
var RiderSchema = new Googleuser({
    additional_info: {type: String)}
});

// Compile model from schema
module.exports = mongoose.model('Rider', RiderSchema);

