module.exports = function (app, passport) {
	// HOME PAGE WITH LOGIN LINKS
	app.get('/', function (req, res) {
		res.render('index.ejs'); // LOADS INDEX.EJS FILE
	});

	// LOGIN ------------------------------------
	// SHOWS LOGIN FORM
	app.get('/login', function (req, res) {
		// RENDER THE PAGE AND PASS IN ANY FLASH DATA IF IT EXISTS
		res.render('login.ejs', {
			message: req.flash('loginMessage')
		});
	});

	// PROCESS THE LOGIN FORM
	app.post('/login', passport.authenticate('local-login', { // ++ CHECK THIS LOCAL-LOGIN ++
		successRedirect: '/profile', // REDIRECT TO THE SECURE PROFILE SECTION
		failureRedirect: '/login', // REDIRECT BACK TO SIGN UP PAGE IF THERE IS AN ERROR
		failureFlash: true // ALLOW FLASH MESSAGES
	}));
	// END OF LOGIN -----------------------------

	// SIGNUP -----------------------------------
	// SHOWS SIGNUP FORM
	app.get('/signup', function (req, res) {
		// RENDER THE PAGE AND PASS IN ANY FLASH DATA IF IT EXISTS
		res.render('signup.ejs', {
			message: req.flash('signupMessage')
		});
	});

	// PROCESS THE SIGNUP FORM
	app.post('/signup', passport.authenticate('local-signup', { // ++ CHECK THIS LOCAL-LOGIN ++
		successRedirect: '/profile', // REDIRECT TO THE SECURE PROFILE SECTION
		failureRedirect: '/signip', // REDIRECT BACK TO SIGN UP PAGE IF THERE IS AN ERROR
		failureFlash: true // ALLOW FLASH MESSAGES
	}));
	// END OF SIGNUP ----------------------------

	// PROFILE ----------------------------------
	app.get('/profile', isLoggedIn, function (req, res) { // isLoggedIn MIDDLEWARE FUNCTION BELOW
		res.render('profile.ejs', {
			user: req.user // GET THE USER OUT OF SESSION AND PASS TO TEMPLATE
		});
	});
	// END OF PROFILE ---------------------------

	// LOGOUT -----------------------------------
	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});
};

// isLoggedIn MIDDLEWARE --------------------
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
	// IF NOT AUTHENTICATED BACK TO HOME PAGE
	res.redirect('/');
}
// END OF isLoggedIn ------------------------