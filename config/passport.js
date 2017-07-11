var LocalStrategy = require('passport-local').Strategy; // LOAD WHAT WE NEED ++PASSPORT-LOCAL++
var user = require('../app/models/user'); // LOAD USER MODEL

// EXPOST THIS FUNCTION TO OUR APP USING MODULE.EXPORTS
module.exports = function (passport) {
    // PASSPORT SETUP
    // REQUIRED PERSISTENT LOGIN SESSIONS
    // PASSPORT NEEDS ABILITY TO SERIALIZE AND UNSERIALIZE USERS OUT OF SESSION

    // SERIALIZE USER FOR SESSION
    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email', // LOCAL STRATEGY USES USERNAME BY DEFAULT, OVERRIDDEN WITH EMAIL
            passwordField: 'password',
            passReqToCallback: true // ALLOWS US TO PASS BACK THE ENTIRE REQUEST TO THE CALLBACK
        },
        function (req, email, password, done) {
            // FIND USER WITH EMAIL AS SAME AS SUPPLIED IN FORMS
            User.findOne({
                'local.email': email
            }, function (err, user) {
                if (err)
                    return done(err);
                // CHECK TO SEE IF EMAIL IS TAKEN
                if (user) {
                    return done(null, false, req.flash('signupMessage', 'That Email is taken.'));
                }
                // IF USER DOES NOT EXIST THEN SET CREDENTIALS
                else {
                    var newUser = newUser();
                    // SET USERS CREDENTIALS
                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password); // CHECK THIS MIGHT BE IN USER MODEL
                    // SAVE THE USER
                    newUser.save(function (err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        }));
    // LOCAL LOGIN
    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // ALLOWS US TO PASS BACK THE ENTIRE REQUEST TO THE CALLBACK

        },
        function (req, email, password, done) { // CALLBACK WITH EMAIL AND PASSWORD FROM OUR FORM
            // FIND EMAIL AS SAME ON FORM
            // CHECKING TO SEE IF USER EXIST
            User.findOne({
                'local.email': email
            }, function (err, user) {
                if (err)
                    return done(err);
                // IF NO USER IS FOUND, RETURN THE MESSAGE
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No User Found.'));
                // USER FOUND BUT WRONG PASSWORD
                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Wrong Password.'));
                // ALL IS WELL
                return done(null, user);
            });
        }));
};