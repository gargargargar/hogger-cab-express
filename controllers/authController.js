//todo: to be combined with googleuserController

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var Googleuser = require('../models/googleuser');
require('dotenv').config();

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: process.env.google_client_id,
    clientSecret: process.env.google_client_secret,
    callbackURL: "https://127.0.0.1:3000/auth/google"
  },
  function(accessToken, refreshToken, profile, done) {
       User.findOrCreate({ googleId: profile.id }, function (err, user) {
         return done(err, user);
       });
  }
));
