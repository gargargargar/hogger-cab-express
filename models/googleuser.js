//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var GoogleuserSchema = new Schema({
    //first_name: {type: String, required: true},
    //last_name: {type: String, required: true},
    //graduation_year: Number,
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    display_name: {type: String, required: true},
    email_address: {type: String/*, required: true*/},//todo: validate
    user_type:
    {
    	type: String,
    	enum: ['rider', 'driver']
    	//required: true,
    },
    id: {type: String, required: true}
});

// Compile model from schema
module.exports = mongoose.model('Googleuser', GoogleuserSchema);

