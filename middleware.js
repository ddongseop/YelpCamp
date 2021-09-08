module.exports.isLoggedIn = (req, res, next) => {
	if(!req.isAuthenticated()){
		req.session.returnTo = req.originalUrl; //store the url they are requesting!
		req.flash('error', 'You must be signed in first!');
		return res.redirect('/login');
	}	
	next();
}

