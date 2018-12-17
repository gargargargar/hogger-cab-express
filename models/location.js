//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var LocationSchema = new Schema({
    name: {type: String, required: true},
    on_campus: {type: Boolean, required: true}
});

// Compile model from schema
var Location = mongoose.model('Location', LocationSchema );
