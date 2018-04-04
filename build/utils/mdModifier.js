"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.highlightCode = exports.mdConverter = undefined;

var _reactShowdown = require("react-showdown");

var _highlight = require("../node_modules/highlight.js");

var Highlight = _interopRequireWildcard(_highlight);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var mdConverter = function mdConverter(content) {
    var converter = new _reactShowdown.Converter({ tables: true, strikethrough: true });
    return converter.convert(content);
};

/* Function only for highlightCode(converted) */
var highlightNestedCode = function highlightNestedCode(li) {
    var numLiChildren = li.children.length;
    for (var i = 0; i < numLiChildren; i++) {
        if (li.children[i].tagName === "UL") {
            var numLis = li.children[i].children.length;
            for (var j = 0; j < numLis; j++) {
                highlightNestedCode(li.children[i].children[j]);
            }
        }
        if (li.children[i].tagName === "PRE") {
            Highlight.highlightBlock(li.children[i]);
        }
    }
};

var highlightCode = function highlightCode(converted) {
    if (!converted) return false;
    if (!converted.children || converted.children.length < 2) return false;
    var elements = converted.children[1].children;
    var numElements = elements.length;
    for (var i = 0; i < numElements; i++) {
        if (elements[i].tagName === "UL") {
            var numLis = elements[i].children.length;
            for (var j = 0; j < numLis; j++) {
                highlightNestedCode(elements[i].children[j]);
            }
        }
        if (elements[i].tagName === "PRE") {
            Highlight.highlightBlock(converted.children[1].children[i]);
        }
    }
    Highlight.initHighlightingOnLoad();
};

exports.mdConverter = mdConverter;
exports.highlightCode = highlightCode;