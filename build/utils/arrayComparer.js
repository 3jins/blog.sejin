"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var isEqual = function isEqual(arr1, arr2) {
    if (!arr1 || !arr2) {
        console.log("[isEqual] At least one parameter is undefined or null");
        return false;
    }
    var len1 = arr1.length;
    var len2 = arr2.length;

    if (len1 !== len2) {
        return false;
    }
    for (var i = 0; i < len1; i++) {
        if (arr1[i] instanceof Array && arr2[i] instanceof Array) {
            if (!isEqual(arr1[i], arr2[i])) {
                return false;
            }
        } else if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    return true;
};

var isContainStr = function isContainStr(arr, str) {
    if (!arr || !str) {
        console.log("[isContainStr] At least one parameter is undefined or null");
        return false;
    }
    var len = arr.length;

    for (var i = 0; i < len; i++) {
        if (arr[i] === str) {
            return true;
        }
    }
    return false;
};
// isContainStr(["1", "2"], "3");
// isContainStr(["1", "2"], "2");

(function () {
    [1, 2, 3].map(function (e) {
        console.log(e);
        if (e === 1) {
            console.log("I'm here");
            return true;
        }
    });
    return false;
})();

exports.isEqual = isEqual;
exports.isContainStr = isContainStr;