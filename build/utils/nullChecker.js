'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isEmpty = function isEmpty(obj) {
    var isZeroEmpty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (obj === null) return true;
    switch (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) {
        case 'undefined':
            return true;
        case 'object':
            return Object.keys(obj).length === 0;
        case 'string':
            return obj === "";
        case 'number':
            return isZeroEmpty && obj === 0;
        case 'boolean':
            return !obj; // I'll consider false as an empty boolean
    }
};

exports.isEmpty = isEmpty;