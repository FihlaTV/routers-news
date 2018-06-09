var keystone = require('keystone');

exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // Set locals
    locals.section = 'video';
    locals.filters = {
        video: req.params.video,
    };
    locals.data = {
        latestVideos: [],
    };

    // Load the current video
    view.on('init', function (next) {
        var q = keystone.list('Video').model.findOne({
            state: 'published',
            slug: locals.filters.video,
        })

        q.exec(function (err, result) {
            locals.data.video = result;
            locals.data.video.date = result._.publishedDate.format('Do MMMM YYYY')
            next(err);
        });

    });

    // Load other videos
    view.on('init', function (next) {
        var q = keystone.list('Video').model.find().where('state', 'published').sort('-publishedDate').limit(4);
        q.exec(function (err, results) {
            locals.data.latestVideos = results;
            let array = locals.data.latestVideos
            for (let i = 0; i < array.length; i++) {
                const element = array[i]
                element.date = element._.publishedDate.format('Do MMMM YYYY')
            }
            next(err);
        });
    });
    // Render the view
    view.render('video');
};