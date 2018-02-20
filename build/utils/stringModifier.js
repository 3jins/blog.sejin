"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function decapitalizeFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}

exports.capitalizeFirstLetter = capitalizeFirstLetter;
exports.decapitalizeFirstLetter = decapitalizeFirstLetter;