'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UpdatedData = exports.Post = undefined;

var _dbConnection = require('./dbConnection');

var _dbConnection2 = _interopRequireDefault(_dbConnection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _dbConnection2.default)('172.18.0.3', '172.18.0.2', 27017, 'blog');

var updatedDataSchema = new _dbConnection.mongoose.Schema({
    dateUpdated: { type: Date, required: true, unique: false }
});

var post = new _dbConnection.mongoose.Schema({
    title: { type: String, required: true, unique: false },
    dateCreated: { type: Date, required: true, unique: false },
    dateUpdated: updatedDataSchema,
    content: { type: String, required: false, unique: false },
    tag: { type: String, required: false, unique: false },
    belongToMajor: { type: String, required: true, unique: false },
    belongToMinor: { type: String, required: true, unique: false }
});

var UpdatedData = _dbConnection.mongoose.model("UpdatedData", updatedDataSchema);
var Post = _dbConnection.mongoose.model("Post", post);

exports.Post = Post;
exports.UpdatedData = UpdatedData;

// const board = new mongoose.Schema({
//     works: [post]
// });
//
// const menu = new mongoose.Schema({
//     title: {type: String, required: true, unique: true},
//     titleForDesign: {type: String, required: true, unique: false},
//     contentMenu: board
// });
//
// const menuModel = mongoose.model('menu', menu);
//
// const menus = {
//     'about': new menuModel({
//         title: 'About',
//         titleForDesign: 'whoami',
//     }),
//     'works': new menuModel({
//         title: 'Works',
//         titleForDesign: 'ls works',
//     }),
//     'blog': new menuModel({
//         title: 'Blog',
//         titleForDesign: 'ls works',
//     }),
//     'contacts.js': new menuModel({
//         title: 'Contacts',
//         titleForDesign: 'echo hello >> ~/contacts.js/mailbox',
//     }),
// };
//
// export { menus };