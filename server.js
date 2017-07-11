// SETUP
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var configDB = require('./config/database.js');

// CONFIGURATION
mongoose.connect(configDB.url); // CONNECT TO DATABASE

require('./config/passport')(passport); // PASS PASSPORT FOR CONFIGURATION

app.configure(function() {
    // SET UP EXPRESS APPLICATION
    app.use(express.logger('dev')); // LOG EVERY REQUEST TO THE CONSOLE
    app.use(express.cookieParser()); // READ COOKIES FOR AUTH
    app.use(express.bodyParser()); // GET INFORMATION FROM HTML FORMS

    // app.set('view engine', 'ejs'); // SET UP EJS FOR TEMPLATING

    // REQUIRED FOR PASSPORT
    app.use(express.session({secret: 'slipknot'})); // SESSION SECRET
    app.use(passport.initialize());
    app.use(passport.session());  // PERSISTENT LOGIN SESSIONS
    app.use(flash());  // USE CONNECT-FLASH FOR FLASH MESSAGES STORED IN SESSION
});

// ROUTES
require('./app/routes.js')(app, passport); // LOAD IN ROUTES AND PASS IN OUR APP AND FULLY CONFIGURED PASSPORT

//  LAUNCH
app.listen(port);
console.log('App is running on port ' + port);

