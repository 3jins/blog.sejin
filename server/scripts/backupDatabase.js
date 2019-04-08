import fs from 'fs';
import path from 'path';
import { PostDao, TagDao/* , CategoryDao, SeriesDao */ } from '../mongoDB/dao';
import configuration from '../Configuration';

const saveData = (backupPath, backupFileName, backupData) => fs.stat(backupPath, (err, stats) => {
  if (err && !stats) {
    return fs.mkdir(backupPath, (err) => {
      if (err) throw err;
      console.log(`[+] Created a directory '${backupPath}'`);
      return saveData(backupPath, backupFileName, backupData);
    });
  }
  if (err) throw err;
  return fs.writeFile(
    path.resolve(backupPath, backupFileName),
    JSON.stringify(backupData),
    (err) => {
      if (err) throw err;
      console.log(`[+] Created ${backupFileName}`);
    },
  );
});

export default async () => {
  const { pathInfo } = configuration;
  const backupPath = pathInfo.backup;
  const backupFileName = `${new Date().getTime()}.json`;

  const filter = '-_id';
  const posts = await PostDao.findAllPosts(filter);
  const tags = await TagDao.findAllTags(filter);
  // const categories = removeAttribute(await CategoryDao.findAllCategories(), keyToRemoveList);
  // const series = removeAttribute(await SeriesDao.findAllSeries(), keyToRemoveList);

  return saveData(backupPath, backupFileName, {
    posts, tags, // categories, series
  });
};
