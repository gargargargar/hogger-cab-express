var express = require('express');
var router = express.Router();
var passport = require('passport');
var Googleuser = require('../models/googleuser')
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const mongoose = require('mongoose')

// Require controller modules.
var googleuser_controller = require('../controllers/googleuserController');

router.get('/', function(req, res){
	res.redirect('/');
})

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
router.get('/google',
 	passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/google' }), //todo: make fail page
    function(req, res) {
    	res.redirect('/google/success');
    });

router.get('/google/success', function(req, res){
	res.render('../views/temp_login_success')
})



module.exports = router;