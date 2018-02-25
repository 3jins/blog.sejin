import {Post, Tag} from './models';
import fs from 'fs';
import {isEqual} from "../utils/arrayComparer";

let posts = [];
const mdPath = process.cwd() + '/md_files';

const extensionCutter = (name) => {
    const idx = name.lastIndexOf(".");
    return name.substring(0, idx);
};

const tagSeparator = (str) => {
    const tags = str.split("#");
    const result = {};
    result['title'] = tags[0];
    tags.shift();
    result['tags'] = tags;
    if (typeof result['tags'] === 'undefined') {
        console.log("[Warning] There is no tag: " + str);
    }
    return result;
};

const addFirst = (arr, element) => {
    arr.reverse();
    arr.push(element);
    arr.reverse();
    return arr;
};

const addTags = function (tags, belongToMinor, postID) {
    if (!tags || !belongToMinor || !postID) {
        console.log("tags: " + tags + " / belongToMinor: " + belongToMinor + " / postID: " + postID)
        return;
    }
    tags.map((tag) => {
        Tag.find({'tagName': tag})
            .then((docs) => {
                if (docs.length === 0) {     // new tag
                    new Tag({
                        tagName: tag,
                        belongToMinor: belongToMinor,
                        postList: [postID],
                    }).save()
                        .then(() => {
                            console.log("Succeeded to save a tag: " + tag);
                        })
                        .catch((err) => {
                            console.log("Failed to save a tag: " + tag);
                            return console.error(err);
                        });
                }
                else {      // existing tag
                    const doc = docs[0];
                    Tag.update(
                        {tagName: tag},
                        {
                            postList: addFirst(doc.postList, postID),
                        }
                    )
                        .then(() => {
                            console.log("Succeeded to update a tag: " + tag);
                        })
                        .catch((err) => {
                            console.log("Failed to update a tag: " + tag);
                            return console.error(err);
                        });
                }
            })
            .catch((err) => {
                console.log("Failed to search a tag: " + tag);
                return console.error(err);
            })
    });
};

const readFiles = function (curPath, belongToMajor = null, belongToMinor = null) {
    return fs.readdir(curPath, (error, files) => {
        if (error) {
            console.error(error);
            return error;
        }

        files.filter((file) => file !== '.git').map((file) => {
            const fullPath = curPath + '/' + file;
            if (fs.statSync(fullPath).isFile()) {    // file
                const titleTag = tagSeparator(extensionCutter(file));
                fs.readFile(fullPath, 'utf-8', (error, data) => {
                    fs.stat(fullPath, () => {
                        posts[posts.length] = new Post({
                            belongToMajor: belongToMajor,
                            belongToMinor: belongToMinor,
                            title: titleTag['title'],
                            tags: titleTag['tags'],
                            dateCreated: new Date().getTime(),
                            dateUpdated: new Date().getTime(),
                            content: data,
                        });
                    });
                });
            }
            else {  // directory
                if (belongToMajor === null) {
                    readFiles(fullPath, file);
                }
                else {
                    if (belongToMinor === null) {
                        readFiles(fullPath, belongToMajor, file.substr(1));
                    }
                    else {
                        readFiles(fullPath, belongToMajor, belongToMinor);
                    }
                }
            }
        });
    });
};

const savePostsInOrder = (idx, limit, largestPostNoSoFar) => {
    if (idx >= limit) {
        console.log("Save completed.");
        return;
    }
    Post.find({
        title: posts[idx].title,
        belongToMajor: posts[idx].belongToMajor,
        belongToMinor: posts[idx].belongToMinor,
    }).then(
        (docs) => {
            if (docs.length === 0) {
                /* if there isn't (create) */
                posts[idx]['postNo'] = largestPostNoSoFar + idx + 1;
                posts[idx].save()
                    .then(() => {
                        addTags(posts[idx].tags, posts[idx].belongToMinor, posts[idx]._id);
                        console.log("Succeeded to save: " + posts[idx].title);
                        savePostsInOrder(++idx, limit, largestPostNoSoFar);
                    })
                    .catch((err) => {
                        console.log("Failed to save: " + posts[idx].title);
                        return console.error(err);
                    });
            }
            else {
                docs.map((doc) => {
                    if (posts[idx].content !== doc.content || !isEqual(posts[idx].tags, doc.tags)) {
                        /* if there is (update) */
                        Post.update(
                            {_id: doc._id},
                            {
                                content: posts[idx].content,
                                tags: posts[idx].tags,
                            }
                        )
                            .then(() => {
                                addTags(posts[idx].tags, posts[idx].belongToMinor, posts[idx]._id);
                                console.log("Succeeded to update: " + posts[idx].title);
                                savePostsInOrder(++idx, limit, largestPostNoSoFar);
                            })
                            .catch((err) => {
                                console.log("Failed to update: " + posts[idx].title);
                                return console.error(err);
                            });
                    }
                    else {
                        /* if there is (pass) */
                        console.log("Pass: " + posts[idx].title);
                        savePostsInOrder(++idx, limit, largestPostNoSoFar);
                    }
                });
            }
        }
    );
};

// TODO : Implement asynchronous logic without using setTimeout
readFiles(mdPath);
setTimeout(() => {
    console.log(posts[0].tags);

    Post.find({}, {postNo: true}).sort({postNo: -1}).limit(1).then(
        (result) => {
            const largestPostNoSoFar = result[0].postNo;
            savePostsInOrder(0, posts.length, largestPostNoSoFar);
        }
    );
}, 1000);