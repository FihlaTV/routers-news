var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Issue Model
 * =============
 */

var Issue = new keystone.List('Issue', {
    map: {
        name: 'title'
    },
    autokey: {
        path: 'slug',
        from: 'title',
        unique: true
    },
});

Issue.add({
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
    description: {
        type: Types.Html,
        wysiwyg: true,
        height: 150
    },
    featured1: {
        type: Types.Relationship,
        ref: 'Article',
    },
    featured2: {
        type: Types.Relationship,
        ref: 'Article'
    },
    featured3: {
        type: Types.Relationship,
        ref: 'Article'
    },
    featured4: {
        type: Types.Relationship,
        ref: 'Article'
    }
});

Issue.defaultSort = '-publishedDate';
Issue.defaultColumns = 'title, state, publishedDate';
Issue.register();