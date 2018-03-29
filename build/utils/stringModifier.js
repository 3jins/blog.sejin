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

function camelCaseToHyphen(string) {
    return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

// source: https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&"); // 'g' means global, '$&' means the whole matched string. Add '\\' to all '[' and ']'s. ('[' -> '\\[', ']' -> '\\]')
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    var results = regex.exec(url);

    if (!results) return null;
    if (!results[2]) return '';

    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

exports.capitalizeFirstLetter = capitalizeFirstLetter;
exports.decapitalizeFirstLetter = decapitalizeFirstLetter;
exports.camelCaseToHyphen = camelCaseToHyphen;
exports.getParameterByName = getParameterByName;