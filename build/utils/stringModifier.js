"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var capitalizeFirstLetter = function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

var decapitalizeFirstLetter = function decapitalizeFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
};

var camelCaseToHyphen = function camelCaseToHyphen(string) {
    return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

// source: https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
var getParameterByName = function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&"); // 'g' means global, '$&' means the whole matched string. Add '\\' to all '[' and ']'s. ('[' -> '\\[', ']' -> '\\]')
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    var results = regex.exec(url);

    if (!results) return null;
    if (!results[2]) return '';

    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

var removeQueryParameters = function removeQueryParameters(url) {
    if (!url) url = window.location.href;
    var idx = url.lastIndexOf("?");
    return url.substring(0, idx);
};

var replaceAll = function replaceAll(str, prev, after) {
    var lastIndex = 0;
    while (true) {
        lastIndex = str.indexOf(prev, lastIndex);
        if (lastIndex < 0) break;
        str = str.replace(prev, after);
        lastIndex += after.length + 1;
    }
    return str;
};

exports.capitalizeFirstLetter = capitalizeFirstLetter;
exports.decapitalizeFirstLetter = decapitalizeFirstLetter;
exports.camelCaseToHyphen = camelCaseToHyphen;
exports.getParameterByName = getParameterByName;
exports.removeQueryParameters = removeQueryParameters;
exports.replaceAll = replaceAll;