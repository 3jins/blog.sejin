'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var menuBasePx = 14;
var contentBasePx = 16;
var menuHeight = 4;

function getBasePx() {
    return {
        'menu': menuBasePx,
        'content': contentBasePx
    };
}

function getMenuHeight() {
    return menuHeight * menuBasePx;
}

function getMenuHeightRaw() {
    return menuHeight;
}

function emToPx(basePx, em) {
    return basePx * em;
}

exports.getBasePx = getBasePx;
exports.getMenuHeight = getMenuHeight;
exports.getMenuHeightRaw = getMenuHeightRaw;
exports.emToPx = emToPx;