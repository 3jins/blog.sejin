import _ from 'lodash';
import { Tag } from '../models';

// const MONGO_DUPLICATE_KEY_ERR = 11000;

const isPostListAdded = (originalPostList, argPostList) => (
  _.intersection(originalPostList, argPostList).length > argPostList.length
);

const isBelongToMinorListAdded = (originalBelongToMinorListAdded, argBelongToMinorListAdded) => (
  _.intersection(originalBelongToMinorListAdded, argBelongToMinorListAdded).length
  > argBelongToMinorListAdded.length
);

const updateTag = (dataObj) => {
  if (!('tagName' in dataObj)) {
    throw Error('[!] updatePost needs a property \'tagName\'!');
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
    let { postList, belongToMinorList } = dataObj;
    let shouldUpdate = false;
    if (isPostListAdded(tag.postList, postList)) {
      console.log(tag.postList, postList);
      console.log(_.intersection(tag.postList, postList));
      postList = [...tag.postList, ...postList];
      shouldUpdate = true;
    }
    if (isBelongToMinorListAdded(tag.belongToMinorList, belongToMinorList)) {
      belongToMinorList = [...tag.belongToMinorList, ...belongToMinorList];
      shouldUpdate = true;
    }
    if (shouldUpdate) {
      return tag
        .set({ postList, belongToMinorList })
        .save()
        .then(() => console.log(`[+] Updated a tag '${dataObj.tagName}'`))
        .catch(err => console.log(err));
    }

    // Do nothing
    return null;
  })
  .catch(err => console.log(err));

const findAllTags = async (projection = {}) => Tag.find().select(projection);

const findTag = (query, projection = '') => Tag.find(query).select(projection);

export {
  createTag,
  updateTag,
  upsertTag,
  findAllTags,
  findTag,
};
