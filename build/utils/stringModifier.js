'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function decapitalizeFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}

function camelCaseToHyphen(string) {
    return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

exports.capitalizeFirstLetter = capitalizeFirstLetter;
exports.decapitalizeFirstLetter = decapitalizeFirstLetter;
exports.camelCaseToHyphen = camelCaseToHyphen;