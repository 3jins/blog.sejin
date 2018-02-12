'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _posts = require('./routes/posts');

var _posts2 = _interopRequireDefault(_posts);

var _post = require('./routes/post');

var _post2 = _interopRequireDefault(_post);

var _tags = require('./routes/tags');

var _tags2 = _interopRequireDefault(_tags);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = 5913;

app.use(_express2.default.static(__dirname + "/../public"));
app.use('/posts', _posts2.default);
app.use('/post', _post2.default);
app.use('/tags', _tags2.default);
app.get('/*', function (req, res) {
    res.sendFile(_path2.default.resolve(__dirname + "/../public/index.html"));
});
console.log(__dirname + "/../public/index.html");

app.listen(port, function () {
    console.log('Express listening on port', port);
});