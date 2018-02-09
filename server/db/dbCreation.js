import {Post, UpdatedData} from './models';
import fs from 'fs';

let posts = [];
const mdPath = process.cwd() + '/md_files';

const extensionCutter = function (name) {
    const idx = name.lastIndexOf(".");
    return name.substring(0, idx);
};

const tagSeparator = function (str) {
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

const readFiles = function (curPath, belongToMajor = null, belongToMinor = null) {
    return fs.readdir(curPath, (error, files) => {
        if (error) {
            console.error(error);
            return error;
        }

        files.map((file) => {
            const fullPath = curPath + '/' + file;
            if (fs.statSync(fullPath).isFile()) {    // file
                const titleTag = tagSeparator(extensionCutter(file));
                fs.readFile(fullPath, 'utf-8', (error, data) => {
                    fs.stat(fullPath, () => {
                        posts[posts.length] = new Post({
                            belongToMajor: belongToMajor,
                            belongToMinor: belongToMinor,
                            title: titleTag['title'],
                            tag: titleTag['tag'],
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

const savePostsInOrder = (idx, limit) => {
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
                posts[idx].save()
                    .then(() => {
                        console.log("Succeeded to save: " + posts[idx].title);
                        savePostsInOrder(++idx, limit);
                    })
                    .catch((err) => {
                        console.log("Failed to save: " + posts[idx].title);
                        return console.error(err);
                    });
            }
            else {
                docs.map((doc) => {
                    if (posts[idx].content !== doc.content) {
                        /* if there is (update) */
                        posts[idx]._id = doc._id;
                        posts[idx].dateCreated = doc.dateCreated;

                        Post.update({_id: doc._id}, {$set: posts[idx]})
                            .then(() => {
                                console.log("Succeeded to update: " + posts[idx].title);
                                savePostsInOrder(++idx, limit);
                            })
                            .catch((err) => {
                                console.log("Failed to save: " + posts[idx].title);
                                return console.error(err);
                            });
                        const updateObject = Post.update({_id: doc._id}, {$set: posts[idx]});
                        console.log(typeof updateObject);
                    }
                    else {
                        /* if there is (pass) */
                        console.log("pass: " + posts[idx].title);
                        savePostsInOrder(++idx, limit);
                    }
                });
            }
        }
    );
};

// TODO : Implement asynchronous logic without using setTimeout
readFiles(mdPath);
setTimeout(() => {
    savePostsInOrder(0, posts.length);
}, 1000);


