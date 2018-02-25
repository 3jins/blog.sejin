'use strict';

var _models = require('./models');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _arrayComparer = require('../utils/arrayComparer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var posts = [];
var mdPath = process.cwd() + '/md_files';

var extensionCutter = function extensionCutter(name) {
    var idx = name.lastIndexOf(".");
    return name.substring(0, idx);
};

var tagSeparator = function tagSeparator(str) {
    var tags = str.split("#");
    var result = {};
    result['title'] = tags[0];
    tags.shift();
    result['tags'] = tags;
    if (typeof result['tags'] === 'undefined') {
        console.log("[Warning] There is no tag: " + str);
    }
    return result;
};

var addFirst = function addFirst(arr, element) {
    arr.reverse();
    arr.push(element);
    arr.reverse();
    return arr;
};

var addTags = function addTags(tags, belongToMinor, postID) {
    if (!tags || !belongToMinor || !postID) {
        console.log("tags: " + tags + " / belongToMinor: " + belongToMinor + " / postID: " + postID);
        return;
    }
    tags.map(function (tag) {
        _models.Tag.find({ 'tagName': tag }).then(function (docs) {
            if (docs.length === 0) {
                // new tag
                new _models.Tag({
                    tagName: tag,
                    belongToMinor: belongToMinor,
                    postList: [postID]
                }).save().then(function () {
                    console.log("Succeeded to save a tag: " + tag);
                }).catch(function (err) {
                    console.log("Failed to save a tag: " + tag);
                    return console.error(err);
                });
            } else {
                // existing tag
                var doc = docs[0];
                _models.Tag.update({ tagName: tag }, {
                    postList: addFirst(doc.postList, postID)
                }).then(function () {
                    console.log("Succeeded to update a tag: " + tag);
                }).catch(function (err) {
                    console.log("Failed to update a tag: " + tag);
                    return console.error(err);
                });
            }
        }).catch(function (err) {
            console.log("Failed to search a tag: " + tag);
            return console.error(err);
        });
    });
};

var readFiles = function readFiles(curPath) {
    var belongToMajor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var belongToMinor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    return _fs2.default.readdir(curPath, function (error, files) {
        if (error) {
            console.error(error);
            return error;
        }

        files.filter(function (file) {
            return file !== '.git';
        }).map(function (file) {
            var fullPath = curPath + '/' + file;
            if (_fs2.default.statSync(fullPath).isFile()) {
                // file
                var titleTag = tagSeparator(extensionCutter(file));
                _fs2.default.readFile(fullPath, 'utf-8', function (error, data) {
                    _fs2.default.stat(fullPath, function () {
                        posts[posts.length] = new _models.Post({
                            belongToMajor: belongToMajor,
                            belongToMinor: belongToMinor,
                            title: titleTag['title'],
                            tags: titleTag['tags'],
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

var savePostsInOrder = function savePostsInOrder(idx, limit, largestPostNoSoFar) {
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
            posts[idx]['postNo'] = largestPostNoSoFar + idx + 1;
            posts[idx].save().then(function () {
                addTags(posts[idx].tags, posts[idx].belongToMinor, posts[idx]._id);
                console.log("Succeeded to save: " + posts[idx].title);
                savePostsInOrder(++idx, limit, largestPostNoSoFar);
            }).catch(function (err) {
                console.log("Failed to save: " + posts[idx].title);
                return console.error(err);
            });
        } else {
            docs.map(function (doc) {
                if (posts[idx].content !== doc.content || !(0, _arrayComparer.isEqual)(posts[idx].tags, doc.tags)) {
                    /* if there is (update) */
                    _models.Post.update({ _id: doc._id }, {
                        content: posts[idx].content,
                        tags: posts[idx].tags
                    }).then(function () {
                        addTags(posts[idx].tags, posts[idx].belongToMinor, posts[idx]._id);
                        console.log("Succeeded to update: " + posts[idx].title);
                        savePostsInOrder(++idx, limit, largestPostNoSoFar);
                    }).catch(function (err) {
                        console.log("Failed to update: " + posts[idx].title);
                        return console.error(err);
                    });
                } else {
                    /* if there is (pass) */
                    console.log("Pass: " + posts[idx].title);
                    savePostsInOrder(++idx, limit, largestPostNoSoFar);
                }
            });
        }
    });
};

// TODO : Implement asynchronous logic without using setTimeout
readFiles(mdPath);
setTimeout(function () {
    console.log(posts[0].tags);

    _models.Post.find({}, { postNo: true }).sort({ postNo: -1 }).limit(1).then(function (result) {
        var largestPostNoSoFar = result[0].postNo;
        savePostsInOrder(0, posts.length, largestPostNoSoFar);
    });
}, 1000);