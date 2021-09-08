const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const User = require('../models/user');

router.get('/register', (req, res) => {
	res.render('users/register');
});
router.post('/register', catchAsync(async(req, res, next) => {
	try{
		const {email, username, password} = req.body;
		const user = new User({email, username});
		const registeredUser = await User.register(user, password);
		req.login(registeredUser, err => {
			if (err) return next(err);
			req.flash('success', 'Welcome to Yelp Camp!');
			res.redirect('/campgrounds');
		})	
	}catch(e){ //똑같은 username 중복 사용으로 발생하는 오류 역시 Mongoose 오류이므로 try...catch 활용, 기존과 다른 사용자 경험을 주기 위해 이렇게 처리
		req.flash('error', e.message);
		res.redirect('/register');
	}
}));

router.get('/login', (req, res) => {
	 res.render('users/login');
});
router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
	req.flash('success', 'Welcome back!');
	const redirectUrl = req.session.returnTo || '/campgrounds';
	delete req.session.returnTo;
	res.redirect(redirectUrl); //redirect to stored url
});

router.get('/logout', (req, res) => {
	req.logout();
	req.flash('success', 'Goodbye!');
	res.redirect('/campgrounds');
})

module.exports = router;