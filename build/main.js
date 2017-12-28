'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _models = require('./db/models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = 5913;

var about = new _models.menuModel({
    title: 'About',
    titleForDesign: 'whoami'
});

about.save(function (err, about) {
    if (err) {
        console.log("Collection save is failed.");
        return console.error(err);
    } else {
        console.log("Save successed!");
        console.log(about);
    }
});

app.use('/', _express2.default.static(__dirname + "/../public"));
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

app.get('/', function (req, res) {
    res.send(about);
});

var server = app.listen(port, function () {
    console.log('Express listening on port', port);
});