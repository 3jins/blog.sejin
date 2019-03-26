import { Post } from '../models';

const isThisPostChanged = (originalPost, dataObj) => (
  originalPost.title !== dataObj.title
  || originalPost.content !== dataObj.content
  || originalPost.category !== dataObj.category
  || originalPost.series !== dataObj.series
  || originalPost.tags !== dataObj.tags
);

const createPost = (dataObj) => {
  const { title } = dataObj;
  return new Post(dataObj).save()
    .then(() => console.log(`[+] Created a post '${title}'`))
    .catch(err => console.log(err));
};

const updatePost = (dataObj) => {
  if (!('title' in dataObj)) {
    throw Error('[!] updatePost needs a property \'title\'!');
  }
  const { title } = dataObj;
  Post.findOne({ title })
    .then((post) => {
      post.set(dataObj);
      post.save();
    })
    .then(() => console.log(`[+] Updated a post '${dataObj.title}'`))
    .catch(err => console.log(err));
};

const upsertPost = async dataObj => Post.findOne({ title: dataObj.title })
  .then((post) => {
    // Create a new one
    if (!post) return createPost({ dateCreated: new Date().getTime(), ...dataObj });

    // Update the existing one
    if (isThisPostChanged(post, dataObj)) {
      post.set(dataObj);
      return post.save();
    }

    // Do nothing
    return null;
  })
  .catch(err => console.log(err));

const findAllPosts = async (projection = '') => Post.find().select(projection);

const findPost = (query, projection = '') => Post.find(query).select(projection);

export {
  createPost,
  updatePost,
  upsertPost,
  findAllPosts,
  findPost,
};
