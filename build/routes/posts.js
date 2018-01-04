'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _models = require('../db/models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import timestamps from 'mongoose-timestamp';
var router = _express2.default.Router();

router.get('(about)?', function (req, res) {
    _models.Post.find({
        "belongToMajor": "About"
    }).exec(function (err, posts) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Could not retrieve works'
            });
        }
        // res.json(posts);
        res.json({ test: "test" });
        // res.format({
        //     html: function(){
        //         res.send(express.static(__dirname + "/../public"));
        //     },
        //     json: function(){
        //         res.send(posts);
        //     },
        // });
    });
});

exports.default = router;