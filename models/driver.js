//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Googleuser = require('./googleuser');

//inherits Googleuser
var DriverSchema = new Googleuser({
    vehicle_info: {type: String)}
});

// Compile model from schema
module.exports = mongoose.model('Driver', DriverSchema);

