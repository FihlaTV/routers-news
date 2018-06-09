/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
var _ = require('lodash')
var keystone = require('keystone')

/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/
exports.initLocals = function (req, res, next) {
	res.locals.navLinks = [{
			label: 'Home',
			key: 'home',
			href: '/'
		},
		{
			label: 'Business',
			key: 'business',
			href: '/business'
		},
		{
			label: 'Politics',
			key: 'politics',
			href: '/politics'
		},
		{
			label: 'Entertainment',
			key: 'entertainment',
			href: '/entertainment'
		},
		{
			label: 'Sports',
			key: 'sports',
			href: '/sports'
		},
		{
			label: 'World',
			key: 'world',
			href: '/world'
		}
	];
	res.locals.user = req.user;
	next();
};

/**
	Fetches latest and featured posts for footer unless home page
*/
exports.footerStories = function (req, res, next) {
	//Fetch latest posts and limit to 2
	var query1 = keystone.list('Article').model.find({
		state: 'published'
	}).sort('-publishedDate').limit(2)
	query1.exec(function (err, results) {
		if (err) {
			next(err)
		} else {
			res.locals.data.latest = results
		}
	});
	//Fetch featured posts 1 and 2 only. This will be overwritten on homepage or category page
	var query2 = keystone.list('Setting').model.find({
		name: 'Homepage'
	}, 'featured1 featured2').populate('featured1 featured2')
	query2.exec(function (err, results) {
		if (err) {
			next(err)
		} else {
			res.locals.data.settings = results[0]
		}
	});
	//Call next middleware
	next();
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.some(flashMessages, function (msgs) {
		return msgs.length;
	}) ? flashMessages : false;
	next();
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};