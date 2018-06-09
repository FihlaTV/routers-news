var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Setting Model
 * =============
 */

var Setting = new keystone.List('Setting', {
    nocreate: true,
    noedit: false,
    nodelete: true,
    singular: 'Setting',
    plural: 'Settings'
});

Setting.add('Top Articles', {
        name: {
            type: String,
            noedit: true,
            hidden: true
        },
        top1: {
            type: Types.Relationship,
            ref: 'Article',
            label: 'Slot 1'
        },
        top2: {
            type: Types.Relationship,
            ref: 'Article',
            label: 'Slot 2'
        },
        top3: {
            type: Types.Relationship,
            ref: 'Article',
            label: 'Slot 3'
        }
    },
    'Featured Articles', {
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
    },
    'Featured Issues', {
        issue1: {
            type: Types.Relationship,
            ref: 'Article',
        },
        issue2: {
            type: Types.Relationship,
            ref: 'Article'
        },
        issue3: {
            type: Types.Relationship,
            ref: 'Article'
        }
    }
);

Setting.defaultSort = '-createdAt';
Setting.defaultColumns = 'name, top1, featured1, issue1';
Setting.register();