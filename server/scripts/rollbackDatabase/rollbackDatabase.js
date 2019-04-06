import * as Dao from '../../mongoDB/dao';

export default async (backupData) => {
  const backupObj = JSON.parse(String(backupData));
  const { posts, tags } = backupObj;
  await Promise.all(posts.map(postObj => Dao.PostDao.upsertPost(postObj, true)));
  await Promise.all(tags.map(tagObj => Dao.TagDao.upsertTag(tagObj)));
};
