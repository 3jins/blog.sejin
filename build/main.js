'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _posts = require('./routes/posts');

var _posts2 = _interopRequireDefault(_posts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
// import bodyParser from 'body-parser';
// import { menus } from './db/models';

var port = 5913;

app.use('/', _express2.default.static(__dirname + "/../public"));
app.use('/works', _posts2.default);
app.use('/blog', _posts2.default);
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.get('/dbdata', (req, res) => {
//     res.send(menus);
// });

app.listen(port, function () {
    console.log('Express listening on port', port);
});