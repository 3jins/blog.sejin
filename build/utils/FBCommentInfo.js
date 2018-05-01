"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getCommentCount = undefined;

var _fbReactSdk = require("fb-react-sdk");

var _fbReactSdk2 = _interopRequireDefault(_fbReactSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getCommentCount = function getCommentCount(url) {
    var domain = "http://enhanced.kr";
    _fbReactSdk2.default.api(domain + url, function (response) {
        if (response && !response.error) {
            /* handle the result */
            console.log(response);
            return response;
        } else {
            console.log("Sth's goin' wrong");
            console.log(response);
        }
    });
    //https://graph.facebook.com/v2.4/?fields=share{comment_count}&id=http://enhanced.kr/postviewer/121
};

exports.getCommentCount = getCommentCount;