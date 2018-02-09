'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _models = require('./models');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var posts = [];
var mdPath = process.cwd() + '/md_files';

var extensionCutter = function extensionCutter(name) {
    var idx = name.lastIndexOf(".");
    return name.substring(0, idx);
};

var readFiles = function readFiles(curPath) {
    var belongToMajor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var belongToMinor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    return _fs2.default.readdir(curPath, function (error, files) {
        if (error) {
            console.error(error);
            return error;
        }

        files.map(function (file) {
            var fullPath = curPath + '/' + file;
            var fileName = extensionCutter(file);
            if (_fs2.default.statSync(fullPath).isFile()) {
                // file
                _fs2.default.readFile(fullPath, 'utf-8', function (error, data) {
                    _fs2.default.stat(fullPath, function () {
                        posts[posts.length] = new _models.Post({
                            belongToMajor: belongToMajor,
                            belongToMinor: belongToMinor,
                            title: fileName,
                            dateCreated: new Date().getTime(),
                            dateUpdated: new Date().getTime(),
                            content: data
                        });
                    });
                });
            } else {
                // directory
                if (belongToMajor === null) {
                    readFiles(fullPath, file);
                } else {
                    if (belongToMinor === null) {
                        readFiles(fullPath, belongToMajor, file.substr(1));
                    } else {
                        readFiles(fullPath, belongToMajor, belongToMinor);
                    }
                }
            }
        });
    });
};

var savePostsInOrder = function savePostsInOrder(idx, limit) {
    if (idx >= limit) {
        console.log("Save completed.");
        return;
    }
    _models.Post.find({
        title: posts[idx].title,
        belongToMajor: posts[idx].belongToMajor,
        belongToMinor: posts[idx].belongToMinor
    }).then(function (docs) {
        if (docs.length === 0) {
            /* if there isn't (create) */
            posts[idx].save().then(function () {
                console.log("Succeeded to save: " + posts[idx].title);
                savePostsInOrder(++idx, limit);
            }).catch(function (err) {
                console.log("Failed to save: " + posts[idx].title);
                return console.error(err);
            });
        } else {
            docs.map(function (doc) {
                if (posts[idx].content !== doc.content) {
                    /* if there is (update) */
                    posts[idx]._id = doc._id;
                    posts[idx].dateCreated = doc.dateCreated;

                    _models.Post.update({ _id: doc._id }, { $set: posts[idx] }).then(function () {
                        console.log("Succeeded to update: " + posts[idx].title);
                        savePostsInOrder(++idx, limit);
                    }).catch(function (err) {
                        console.log("Failed to save: " + posts[idx].title);
                        return console.error(err);
                    });
                    var updateObject = _models.Post.update({ _id: doc._id }, { $set: posts[idx] });
                    console.log(typeof updateObject === 'undefined' ? 'undefined' : _typeof(updateObject));
                } else {
                    /* if there is (pass) */
                    console.log("pass: " + posts[idx].title);
                    savePostsInOrder(++idx, limit);
                }
            });
        }
    });
};

// TODO : Implement asynchronous logic without using setTimeout
readFiles(mdPath);
setTimeout(function () {
    savePostsInOrder(0, posts.length);
}, 1000);