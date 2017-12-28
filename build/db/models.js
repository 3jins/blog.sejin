'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.menus = undefined;

var _dbConnection = require('./dbConnection');

var _dbConnection2 = _interopRequireDefault(_dbConnection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _dbConnection2.default)('172.18.0.3', 27017, 'blog');

var updatedDataSchema = new _dbConnection.mongoose.Schema({
    dateUpdated: { type: Date, required: true, unique: false }
});

var post = new _dbConnection.mongoose.Schema({
    title: { type: String, required: true, unique: false },
    dateCreated: { type: Date, required: true, unique: false },
    dateUpdated: updatedDataSchema,
    content: { type: String, required: false, unique: false },
    tag: { type: String, required: false, unique: false }
});

var board = new _dbConnection.mongoose.Schema({
    posts: [post]
});

var menu = new _dbConnection.mongoose.Schema({
    title: { type: String, required: true, unique: true },
    titleForDesign: { type: String, required: true, unique: false },
    contentMenu: board
});

var menuModel = _dbConnection.mongoose.model('menu', menu);

var menus = {
    'about': new menuModel({
        title: 'About',
        titleForDesign: 'whoami'
    }),
    'works': new menuModel({
        title: 'Works',
        titleForDesign: 'ls works'
    }),
    'blog': new menuModel({
        title: 'Blog',
        titleForDesign: 'ls posts'
    }),
    'contacts': new menuModel({
        title: 'Contacts',
        titleForDesign: 'echo hello >> ~/contacts/mailbox'
    })
};

exports.menus = menus;