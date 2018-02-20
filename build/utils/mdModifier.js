'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mdConverter = undefined;

var _reactShowdown = require('react-showdown');

var mdConverter = function mdConverter(content) {
    var converter = new _reactShowdown.Converter({ tables: true, strikethrough: true });
    return converter.convert(content);
};

exports.mdConverter = mdConverter;