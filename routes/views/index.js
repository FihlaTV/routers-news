var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'Welcome';
	locals.data = {};
	var categories = []

	// Load each catgories
	view.on('init', function (next) {
		for (let i = 0; i < res.locals.navLinks.length; i++) {
			const element = res.locals.navLinks[i];
			if (element.key !== 'home') {
				categories.push(element.key)
			}
		}
		next()
	});

	// Load settings for Homepage
	view.on('init', function (next) {
		var q = keystone.list('Setting').model.find({
			name: 'Homepage'
		}).populate('top1 top2 top3 featured1 featured2 featured3 featured4 issue1 issue2 isssue3')
		q.exec(function (err, results) {
			if (err) {
				next(err)
			} else {
				locals.data.settings = results[0]
			}
		});
		next()
	});

	//Load data for each articles from each category
	view.on('init', function (next) {
		for (let i = 0; i < categories.length; i++) {
			const category = categories[i];
			var q = keystone.list('Article').model.find({
				state: 'published',
				category: category
			}).sort('-publishedDate').limit(5)
			q.exec(function (err, results) {
				if (err) {
					next(err)
				} else {
					locals.data[category] = results
					let array = locals.data[category]
					for (let i = 0; i < array.length; i++) {
						const element = array[i]
						//Use the lodash library from each model to format the date
						element.date = element._.publishedDate.format('Do MMMM YYYY')
					}
				}
			});
		}
		next()
	});

	// Load videos
	view.on('init', function (next) {
		var q = keystone.list('Video').model.find({
			state: 'published'
		}).sort('-publishedDate').limit(5)
		q.exec(function (err, results) {
			if (err) {
				next(err)
			} else {
				locals.data.videos = results
				let array = locals.data.videos
				for (let i = 0; i < array.length; i++) {
					const element = array[i]
					//Use the lodash library from each model to format the date
					element.date = element._.publishedDate.format('Do MMMM YYYY')
				}
			}
		});
		next()
	});

	// Load issues
	view.on('init', function (next) {
		var q = keystone.list('Issue').model.find({
			state: 'published'
		}).sort('-publishedDate').limit(3)
		q.exec(function (err, results) {
			if (err) {
				next(err)
			} else {
				locals.data.issues = results
				let array = locals.data.issues
				for (let i = 0; i < array.length; i++) {
					const element = array[i]
					//Use the lodash library from each model to format the date
					element.date = element._.publishedDate.format('Do MMMM YYYY')
				}
			}
		});
		next()
	});

	// Render the view
	view.render('index');
};

function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}