'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.highlightCode = exports.mdConverter = undefined;

var _reactShowdown = require('react-showdown');

var _highlight = require('../../node_modules/highlight.js');

var _highlight2 = _interopRequireDefault(_highlight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mdConverter = function mdConverter(content) {
    var converter = new _reactShowdown.Converter({ tables: true, strikethrough: true });
    return converter.convert(content);
};

var highlightCode = function highlightCode(converted) {
    if (!converted) return false;
    if (!converted.children || converted.children.length < 2) return false;
    var elements = converted.children[1].children;
    var numElements = elements.length;
    for (var i = 0; i < numElements; i++) {
        if (elements[i].tagName === "PRE") {
            _highlight2.default.highlightBlock(converted.children[1].children[i]);
        }
    }
    _highlight2.default.initHighlightingOnLoad();
};

exports.mdConverter = mdConverter;
exports.highlightCode = highlightCode;