import {Post, Tag} from './models';
import fs from 'fs';
import {isEqual, isContain} from "../utils/arrayComparer";

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

const checkPostIncluded = (postList, post) => {
    if (!postList || !post) {
        console.log("[checkPostIncluded] postList(" + postList + ") or post(" + post + ") is null or undefined.");
    }
    const numPosts = postList.length;
    for (let i = 0; i < numPosts; i++) {
        if (postList[i].title === post.title) {
            return true;
        }
    }
    return false;
};

const checkIfNeedUpdate = (dbPost, mdFile) => {
    return (
        (dbPost.title === mdFile.title) &&
        !(dbPost.content === mdFile.content && isEqual(dbPost.tags, mdFile.tags))
    );
};

const getLargestPostNoSoFar = (posts, numPosts) => {
    let largestPostNoSoFar = 0;
    for (let i = 0; i < numPosts; i++) {
        if (posts[i].postNo > largestPostNoSoFar) {
            largestPostNoSoFar = posts[i].postNo;
        }
    }
    return largestPostNoSoFar;
};

const addFirst = (arr, element) => {
    if (!isContain(arr, element)) {
        arr.reverse();
        arr.push(element);
        arr.reverse();
    }
    return arr;
};

const reconstructMds = (mdFiles) => {
    if (!mdFiles) {
        console.log("[reconstructMds] mdFiles is null or undefined.");
    }
    const numMds = mdFiles.length;
    const mdSortedByTag = {};
    for (let i = 0; i < numMds; i++) {
        const addedTags = Object.keys(mdSortedByTag);
        const mdFile = mdFiles[i];
        const tags = mdFile.tags;
        const numTags = tags.length;
        for (let j = 0; j < numTags; j++) {
            const tag = tags[j];
            if (isContain(addedTags, tag)) {
                // Modify an existing tag
                addFirst(mdSortedByTag[tag].postList, mdFile.title);
            }
            else {
                // Add a new tag
                mdSortedByTag[tag] = {
                    tagName: tag,
                    belongToMinor: mdFile.belongToMinor,
                    postList: [mdFile.title],
                };
            }
        }
    }

    return mdSortedByTag;
};

const readFiles = function (curPath, belongToMajor = null, belongToMinor = null) {
    let mds = [];
    const files = fs.readdirSync(curPath);
    const numFiles = files.length;

    for (let i = 0; i < numFiles; i++) {
        const file = files[i];
        if (file !== '.git') {
            const fullPath = curPath + '/' + file;
            if (fs.statSync(fullPath).isFile()) {    // file
                const titleTag = tagSeparator(extensionCutter(file));
                const data = fs.readFileSync(fullPath, 'utf-8');
                mds[mds.length] = new Post({
                    belongToMajor: belongToMajor,
                    belongToMinor: belongToMinor,
                    title: titleTag['title'],
                    tags: titleTag['tags'],
                    dateCreated: new Date().getTime(),
                    dateUpdated: new Date().getTime(),
                    content: data,
                });
            }
            else {  // directory
                if (belongToMajor === null) {
                    mds = mds.concat(readFiles(fullPath, file));
                }
                else {
                    if (belongToMinor === null) {
                        mds = mds.concat(readFiles(fullPath, belongToMajor, file.substr(1)));
                    }
                    else {
                        mds = mds.concat(readFiles(fullPath, belongToMajor, belongToMinor));
                    }
                }
            }
        }
    }

    return mds;
};


Post.find().then((posts) => {
    const mds = readFiles(mdPath);
    const numMds = mds.length;
    const numPosts = posts.length;
    const largestPostNoSoFar = getLargestPostNoSoFar(posts, numPosts);

    /* Add new posts or update changed posts to DB */
    for (let i = 0; i < numMds; i++) {
        const mdFile = mds[i];
        if (!checkPostIncluded(posts, mdFile)) {
            // new file
            mdFile.postNo = largestPostNoSoFar + i + 1;
            mdFile.save()
                .then(() => {
                    console.log("Succeeded to save: " + mdFile.title);
                })
                .catch((err) => {
                    console.log("Failed to save: " + mdFile.title);
                    return console.error(err);
                });
        }
        else {
            for (let j = 0; j < numPosts; j++) {
                const dbPost = posts[j];
                if (checkIfNeedUpdate(dbPost, mdFile)) {
                    if (j === 0) {
                        console.log(dbPost.content);
                        console.log(mdFile.content);
                    }
                    // update
                    Post.update(
                        {_id: dbPost._id},
                        {
                            $set: {
                                dateUpdated: new Date().getTime(),
                                content: mdFile.content,
                                tags: mdFile.tags,
                            }
                        },
                    )
                        .then(() => {
                            console.log("Succeeded to update: " + mdFile.title);
                        })
                        .catch((err) => {
                            console.log("Failed to update: " + mdFile.title);
                            return console.error(err);
                        });
                }
            }
        }
        console.log("Pass: " + mdFile.title);
    }
    console.log("Post addition/update are completed.");

    /* Remove posts from DB */
    for (let i = 0; i < numPosts; i++) {
        const dbPost = posts[i];
        if (!checkPostIncluded(mds, dbPost)) {
            // remove
            Post.remove({_id: dbPost._id})
                .then(() => {
                    console.log("Succeeded to remove: " + dbPost.title);
                })
                .catch((err) => {
                    console.log("Failed to remove: " + dbPost.title);
                    return console.error(err);
                });
        }
    }
    console.log("Post removal is completed.");

    /* Update tags of DB */
    const mdsSortedByTag = reconstructMds(mds);
    const tags = Object.keys(mdsSortedByTag);
    const numTags = tags.length;

    for (let i = 0; i < numTags; i++) {
        const tagFromMd = tags[i];
        const tagObject = mdsSortedByTag[tagFromMd];
        Tag.find({tagName: tagFromMd}).then((docs) => {
            if (docs.length === 0) {
                /* Create a new tag */
                // console.log(mdsSortedByTag[tagFromMd]);
                new Tag(tagObject).save()
                    .then(() => {
                        console.log("Succeeded to save a tag: " + tagFromMd);
                    })
                    .catch((err) => {
                        console.log("Failed to save a tag: " + tagFromMd);
                        return console.error(err);
                    });
            }
            else {
                /* Update the postList of the existing tag */
                Tag.update({tagName: tagObject.tagName}, {$set: {postList: tagObject.postList}})
                    .then(() => {
                        console.log("Succeeded to update the postList from the tag: " + tagFromMd);
                    })
                    .catch((err) => {
                        console.log("Failed to update the postList from the tag: " + tagFromMd);
                        return console.error(err);
                    });
            }
        });
    }
    console.log("Tag addition/update/removal are completed.");
});