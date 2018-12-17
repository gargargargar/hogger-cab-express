// Create an instance of model SomeModel
var Googleuser = require('../models/googleuser')
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const mongoose = require('mongoose')
require('dotenv').config();

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
        clientID: process.env.google_client_id,
        clientSecret: process.env.google_client_secret,
        callbackURL: "https://127.0.0.1:3000/auth/google/callback" //what should be the callback
    },
    function(accessToken, refreshToken, profile, done) {
        /*
        Googleuser.findOrCreate({ googleId: profile.id }, function (err, user) {//todo implement this
            return done(err, user);
        });
        */

        //todo: VALIDATE NMH

        Googleuser.findOne({ 'googleId': profile.id})
            .exec( function(err, found_googleuser) {
                if (err) { return next(err); }

                if (found_googleuser) {
                    // Googleuser exists, redirect to failure page.
                    if (found_googleuser.user_type == 'rider'){
                        res.render('../views/rider_homepage', {display_name: found_googleuser.display_name});
                    }
                    else {
                        res.render('../views/driver_homepage', {display_name: found_googleuser.display_name});
                    }
                }
                else {
                    var googleuser = new Googleuser({
                        first_name: profile.name.givenName,
                        last_name: profile.name.familyName,
                        display_name: profile.name.displayName,
                        email: profile.emails[0].value,
                        user_type: 'rider', //todo: HORRIBLE TEMPORARY MEAN
                        id: profile.id
                    });

                       googleuser.save(function (err) {
                        if (err) { return next(err); }
                        // Googleuser saved. Redirect to success page.
                        res.render('../views/googleuser_register_success'); //todo: something else
                    });

                    //router.get('/create', this.googleuser_create_get); //todo: add option to make them driver or rider
                }
        });
    }
));

// Display Author create form on GET.
exports.googleuser_create_get = function(req, res, next) {       
    res.render('googleuser_form', { title: 'Create GoogleUser'}); //add related user info
};

// Handle Author create on POST.
exports.googleuser_create_post = [

    // Validate fields.
    //todo make your own validations
    
    /*
    body('first_name').isLength({ min: 1 }).trim().withMessage('First name must be specified.')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('family_name').isLength({ min: 1 }).trim().withMessage('Family name must be specified.')
        .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
    body('date_of_birth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601(),
    body('date_of_death', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601(),
    */

	//todo is Bootstrap validation good enough?    

    // Sanitize fields.
    
    sanitizeBody('emailAddress').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        console.log(req.body);

        // Create a genre object with escaped and trimmed data.
        var googleuser = new Googleuser({
            email_address: req.body.emailAddress,
            user_type: req.body.userType,

            first_name: 'testfirstname',
            last_name: 'testlastname',
            display_name: 'testdisplayname',
            id: 'testid'
        });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('googleuser_form', { title: 'Create GoogleUser', author: req.body, errors: errors.array() });
            return;
        }

 
        else {
            // Data from form is valid.
            // Check if Genre with same name already exists.
            Googleuser.findOne({ 'email_address': req.body.emailAddress})
                .exec( function(err, found_googleuser) {
                    if (err) { return next(err); }

                    if (found_googleuser) {
                        // Googleuser exists, redirect to logged-in page.
                        if (found_googleuser.user_type == 'rider'){
                            res.render('../views/rider_homepage', {display_name: found_googleuser.display_name});
                        }
                        else {
                            res.render('../views/driver_homepage', {display_name: found_googleuser.display_name});
                        }
                    }
                    else {
                            googleuser.save(function (err) {
                            if (err) { return next(err); }
                            // Googleuser saved. Redirect to success page.
                            res.render('../views/googleuser_register_success', {user_type: googleuser.user_type}); //todo: something else
                        });
                    }
                });
            }
    }
];


/*
// Save the new model instance, passing a callback
awesome_instance.save(function (err) {
    if (err) return handleError(err);// saved!
});



// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://www.example.com/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return done(err, user);
        });
    }
));

*/