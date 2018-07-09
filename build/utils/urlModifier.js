'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/* I think Facebook APIs are not good choice for your app. */
var https2http = function https2http(url) {
    if (url.length > 4 && url[4] === 's') {
        url = ['http', url.slice(5, url.length)].join('');
    }
    return url;
};

exports.https2http = https2http;