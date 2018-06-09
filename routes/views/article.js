var keystone = require('keystone');

exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;
    // Set locals
    // locals.section is used to set the currently selected
    // item in the header navigation.
    locals.section = req.params.category;
    locals.filters = {
        article: req.params.article,
    };
    locals.data = {
        latestArticles: [],
    };

    // Load the current article
    view.on('init', function (next) {
        var q = keystone.list('Article').model.findOne({
            state: 'published',
            slug: locals.filters.article,
        })
        q.exec(function (err, result) {
            //If no article then redirect to 404
            if (!result) {
                res.redirect('/')
            }
            locals.data.article = result;
            locals.data.article.date = result._.publishedDate.format('Do MMMM YYYY')
            next(err);
        });

    });

    // Load latest articles
    view.on('init', function (next) {
        var q = keystone.list('Article').model.find().where('state', 'published').sort('-publishedDate').limit(4);
        q.exec(function (err, results) {
            locals.data.latestArticles = results;
            let array = locals.data.latestArticles
            for (let i = 0; i < array.length; i++) {
                const element = array[i]
                element.date = element._.publishedDate.format('Do MMMM YYYY')
            }
            next(err);
        });
    });


    // Render the view
    view.render('article');
};