var keystone = require('keystone');

exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;
    // Set locals
    // locals.section is used to set the currently selected
    // item in the header navigation.
    locals.section = "<Insert issue title here>"
    locals.filters = {
        issue: req.params.issue,
    };
    locals.data = {};

    // Load the current article
    view.on('init', function (next) {
        var q = keystone.list('Issue').model.findOne({
            state: 'published',
            slug: locals.filters.issue
        }).populate('featured1 featured2 featured3 featured4')
        q.exec(function (err, result) {
            //If no article then redirect to 404
            if (!result) {
                res.redirect('/')
            }
            locals.data = result;
            next(err);
        });
    });

    // Render the view
    view.render('issue');
};