'use strict';

var _models = require('./models');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _arrayComparer = require('../utils/arrayComparer');

var _sitemapBuilder = require('./sitemapBuilder');

var _sitemapBuilder2 = _interopRequireDefault(_sitemapBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var checkPostIncluded = function checkPostIncluded(postList, post) {
    if (!postList || !post) {
        console.log("[checkPostIncluded] postList(" + postList + ") or post(" + post + ") is null or undefined.");
    }
    var numPosts = postList.length;
    for (var i = 0; i < numPosts; i++) {
        if (postList[i].title === post.title) {
            return true;
        }
    }
    return false;
};

var checkIfNeedUpdate = function checkIfNeedUpdate(dbPost, mdFile) {
    return dbPost.title === mdFile.title && !(dbPost.content === mdFile.content && (0, _arrayComparer.isEqual)(dbPost.tags, mdFile.tags));
};

var getLargestPostNoSoFar = function getLargestPostNoSoFar(posts, numPosts) {
    var largestPostNoSoFar = 0;
    for (var i = 0; i < numPosts; i++) {
        if (posts[i].postNo > largestPostNoSoFar) {
            largestPostNoSoFar = posts[i].postNo;
        }
    }
    return largestPostNoSoFar;
};

var addFirst = function addFirst(arr, element) {
    if (!(0, _arrayComparer.isContain)(arr, element)) {
        arr.reverse();
        arr.push(element);
        arr.reverse();
    }
    return arr;
};

var reconstructMds = function reconstructMds(mdFiles) {
    if (!mdFiles) {
        console.log("[reconstructMds] mdFiles is null or undefined.");
    }
    var numMds = mdFiles.length;
    var mdSortedByTag = {};
    for (var i = 0; i < numMds; i++) {
        var addedTags = Object.keys(mdSortedByTag);
        var mdFile = mdFiles[i];
        var tags = mdFile.tags;
        var numTags = tags.length;
        for (var j = 0; j < numTags; j++) {
            var tag = tags[j];
            if ((0, _arrayComparer.isContain)(addedTags, tag)) {
                // Modify an existing tag
                addFirst(mdSortedByTag[tag].postList, mdFile.title);
            } else {
                // Add a new tag
                mdSortedByTag[tag] = {
                    tagName: tag,
                    belongToMinor: mdFile.belongToMinor,
                    postList: [mdFile.title]
                };
            }
        }
    }

    return mdSortedByTag;
};

var readFiles = function readFiles(curPath) {
    var belongToMajor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var belongToMinor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    var mds = [];
    var files = _fs2.default.readdirSync(curPath);
    var numFiles = files.length;

    for (var i = 0; i < numFiles; i++) {
        var file = files[i];
        if (file !== '.git') {
            var fullPath = curPath + '/' + file;
            if (_fs2.default.statSync(fullPath).isFile()) {
                // file
                var titleTag = tagSeparator(extensionCutter(file));
                var data = _fs2.default.readFileSync(fullPath, 'utf-8');
                mds[mds.length] = new _models.Post({
                    belongToMajor: belongToMajor,
                    belongToMinor: belongToMinor,
                    title: titleTag['title'],
                    tags: titleTag['tags'],
                    dateCreated: new Date().getTime(),
                    dateUpdated: new Date().getTime(),
                    content: data
                });
            } else {
                // directory
                if (belongToMajor === null) {
                    mds = mds.concat(readFiles(fullPath, file));
                } else {
                    if (belongToMinor === null) {
                        mds = mds.concat(readFiles(fullPath, belongToMajor, file.substr(1)));
                    } else {
                        mds = mds.concat(readFiles(fullPath, belongToMajor, belongToMinor));
                    }
                }
            }
        }
    }

    return mds;
};

_models.Post.find().then(function (posts) {
    var mds = readFiles(mdPath);
    var numMds = mds.length;
    var numPosts = posts.length;
    var largestPostNoSoFar = getLargestPostNoSoFar(posts, numPosts);

    /* Add new posts or update changed posts to DB */

    var _loop = function _loop(i) {
        var mdFile = mds[i];
        if (!checkPostIncluded(posts, mdFile)) {
            // new file
            mdFile.postNo = largestPostNoSoFar + i + 1;
            mdFile.save().then(function () {
                console.log("Succeeded to save: " + mdFile.title);
            }).catch(function (err) {
                console.log("Failed to save: " + mdFile.title);
                return console.error(err);
            });
        } else {
            for (var j = 0; j < numPosts; j++) {
                var _dbPost = posts[j];
                if (checkIfNeedUpdate(_dbPost, mdFile)) {
                    if (j === 0) {
                        console.log(_dbPost.content);
                        console.log(mdFile.content);
                    }
                    // update
                    _models.Post.update({ _id: _dbPost._id }, {
                        $set: {
                            dateUpdated: new Date().getTime(),
                            content: mdFile.content,
                            tags: mdFile.tags
                        }
                    }).then(function () {
                        console.log("Succeeded to update: " + mdFile.title);
                    }).catch(function (err) {
                        console.log("Failed to update: " + mdFile.title);
                        return console.error(err);
                    });
                }
            }
        }
        console.log("Pass: " + mdFile.title);
    };

    for (var i = 0; i < numMds; i++) {
        _loop(i);
    }
    console.log("Post addition/update are completed.");

    /* Remove posts from DB */

    var _loop2 = function _loop2(i) {
        var dbPost = posts[i];
        if (!checkPostIncluded(mds, dbPost)) {
            // remove
            _models.Post.remove({ _id: dbPost._id }).then(function () {
                console.log("Succeeded to remove: " + dbPost.title);
            }).catch(function (err) {
                console.log("Failed to remove: " + dbPost.title);
                return console.error(err);
            });
        }
    };

    for (var i = 0; i < numPosts; i++) {
        _loop2(i);
    }
    console.log("Post removal is completed.");

    /* Update tags of DB */
    var mdsSortedByTag = reconstructMds(mds);
    var tags = Object.keys(mdsSortedByTag);
    var numTags = tags.length;

    var _loop3 = function _loop3(i) {
        var tagFromMd = tags[i];
        var tagObject = mdsSortedByTag[tagFromMd];
        _models.Tag.find({ tagName: tagFromMd }).then(function (docs) {
            if (docs.length === 0) {
                /* Create a new tag */
                // console.log(mdsSortedByTag[tagFromMd]);
                new _models.Tag(tagObject).save().then(function () {
                    console.log("Succeeded to save a tag: " + tagFromMd);
                }).catch(function (err) {
                    console.log("Failed to save a tag: " + tagFromMd);
                    return console.error(err);
                });
            } else {
                /* Update the postList of the existing tag */
                _models.Tag.update({ tagName: tagObject.tagName }, { $set: { postList: tagObject.postList } }).then(function () {
                    console.log("Succeeded to update the postList from the tag: " + tagFromMd);
                }).catch(function (err) {
                    console.log("Failed to update the postList from the tag: " + tagFromMd);
                    return console.error(err);
                });
            }
        });
    };

    for (var i = 0; i < numTags; i++) {
        _loop3(i);
    }
    console.log("Tag addition/update/removal are completed.");

    (0, _sitemapBuilder2.default)();
});