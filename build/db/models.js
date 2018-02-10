'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Tag = exports.Post = undefined;

var _dbConnection = require('./dbConnection');

var _dbConnection2 = _interopRequireDefault(_dbConnection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _dbConnection2.default)('172.18.0.3', '172.18.0.2', 27017, 'blog');

var post = new _dbConnection.mongoose.Schema({
    title: { type: String, required: true, unique: false },
    dateCreated: { type: Date, required: true, unique: false },
    dateUpdated: { type: Date, required: true, unique: false },
    content: { type: String, required: false, unique: false },
    tags: { type: Array, required: false, unique: false },
    belongToMajor: { type: String, required: true, unique: false },
    belongToMinor: { type: String, required: true, unique: false }
});

var tag = new _dbConnection.mongoose.Schema({
    tagName: { type: String, required: true, unique: true }
});

var Post = _dbConnection.mongoose.model("Post", post, "posts");
var Tag = _dbConnection.mongoose.model("Tag", tag, "tags");

exports.Post = Post;
exports.Tag = Tag;