'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _models = require('../db/models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import timestamps from 'mongoose-timestamp';
var router = _express2.default.Router();

router.get('/:nav/:subnav', function (req, res) {
    var nav = req.params.nav;
    var subnav = req.params.subnav;
    _models.Post.find({
        "belongToMajor": nav,
        "belongToMinor": subnav
    }).exec(function (err, posts) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Could not retrieve works'
            });
        }
        res.json(posts);
    });
});

exports.default = router;