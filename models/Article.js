var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Article Model
 * =============
 */

var Article = new keystone.List('Article', {
    map: {
        name: 'title'
    },
    autokey: {
        path: 'slug',
        from: 'title',
        unique: true
    },
});

Article.add({
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
    author: {
        type: Types.Relationship,
        ref: 'User',
        index: true
    },
    publishedDate: {
        type: Types.Date,
        index: true,
        dependsOn: {
            state: 'published'
        }
    },
    image: {
        type: Types.CloudinaryImage
    },
    content: {
        brief: {
            type: Types.Html,
            wysiwyg: true,
            height: 150
        },
        extended: {
            type: Types.Html,
            wysiwyg: true,
            height: 400
        },
    },
    category: {
        type: Types.Select,
        options: 'business, politics, entertainment, sports, world',
        default: 'world',
        index: true
    },
});

Article.defaultSort = '-publishedDate';
Article.defaultColumns = 'title, category, state, author, publishedDate';
Article.register();