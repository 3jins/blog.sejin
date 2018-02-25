'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _models = require('../db/models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/:subnav', function (req, res) {
    var subnav = req.params.subnav;
    var tags = [];
    if (subnav === "") {
        tags = _models.Tag.find();
    } else {
        tags = _models.Tag.find({ "belongToMinor": subnav });
    }
    tags.exec(function (err, tags) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Could not retrieve tags of ' + subnav
            });
        }
        res.json(tags);
    });
});

exports.default = router;