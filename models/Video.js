var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Video Model
 * ==========
 */

var Video = new keystone.List('Video', {
    map: {
        name: 'title'
    },
    autokey: {
        path: 'slug',
        from: 'title',
        unique: true
    },
});

Video.add({
    title: {
        type: String,
        required: true
    },
    state: {
        type: Types.Select,
        options: 'draft, published, archived',
        default: 'draft',
        index: true
    },
    publishedDate: {
        type: Types.Date,
        index: true,
        dependsOn: {
            state: 'published'
        }
    },
    thumbnail: {
        type: Types.CloudinaryImage,
        folder: 'routers-news'
    },
    videoLink: {
        type: Types.Url
    },
    description: {
        type: Types.Html,
        wysiwyg: true,
        height: 150
    },
});

Video.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Video.register();