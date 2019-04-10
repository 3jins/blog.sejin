import _ from 'lodash';
import { Tag } from '../models';

// const MONGO_DUPLICATE_KEY_ERR = 11000;

const isPostListAdded = (originalPostList, argPostList) => (
  _.intersection(originalPostList, argPostList).length < argPostList.length
);

const isBelongToMinorListAdded = (originalBelongToMinorListAdded, argBelongToMinorListAdded) => (
  _.intersection(originalBelongToMinorListAdded, argBelongToMinorListAdded).length
  < argBelongToMinorListAdded.length
);

const updateTag = (dataObj) => {
  if (!('tagName' in dataObj)) {
    throw Error('[!] updateTag needs a property \'tagName\'!');
  }
  const { tagName, postList, belongToMinorList } = dataObj;
  return Tag.findOne({ tagName })
    .then((tag) => {
      tag
        .set({
          ...dataObj,
          postList: [...tag.postList, ...postList],
          belongToMinorList: [...tag.belongToMinorList, ...belongToMinorList],
        })
        .save((err) => {
          if (err) throw err;
          console.log(`[+] Updated a tag '${tagName}'`);
        });
    });
};

const createTag = (dataObj) => {
  const { tagName } = dataObj;
  return new Tag(dataObj).save((err) => {
    if (err) throw err;
    console.log(`[+] Created a tag '${tagName}'`);
  });
};

const upsertTag = dataObj => Tag.findOne({ tagName: dataObj.tagName })
  .then((tag) => {
    // Create a new one
    if (!tag) return createTag(dataObj);
    // Update the existing one
    let { postList, belongToMinorList } = tag;
    let shouldUpdate = false;
    if (isPostListAdded(postList, dataObj.postList)) {
      postList = [...postList, ...dataObj.postList];
      shouldUpdate = true;
    }
    if (isBelongToMinorListAdded(belongToMinorList, dataObj.belongToMinorList)) {
      belongToMinorList = [...belongToMinorList, ...dataObj.belongToMinorList];
      shouldUpdate = true;
    }
    if (shouldUpdate) {
      return tag
        .set({ postList, belongToMinorList })
        .save()
        .then(() => console.log(`[+] Updated a tag '${dataObj.tagName}'`))
        .catch((err) => {
          console.error(err);
          return err;
        });
    }

    // Do nothing
    return null;
  })
  .catch((err) => {
    console.error(err);
    return err;
  });

const findAllTags = async (projection = {}) => Tag.find().select(projection);

const findTag = (query, projection = '') => Tag.find(query).select(projection);

export {
  createTag,
  updateTag,
  upsertTag,
  findAllTags,
  findTag,
};
