import mongoose from 'mongoose';
import connectToMongo from '../../mongoDB/connectToMongo';
import Configuration from '../../Configuration';
import getFileList from './getFileList';
import buildSitemap from '../buildSitemap';
import backupDatabase from '../backupDatabase';
import syncPosts from './syncPosts';
import syncTags from './syncTags';

const { pathInfo } = Configuration;
connectToMongo()
  .then(() => getFileList(pathInfo.mdFiles))
  .then(async (fileList) => {
    Promise.all(syncPosts(fileList));
    Promise.all(syncTags(fileList));
  })
  .then(() => buildSitemap())
  .then(() => backupDatabase())
  .then(() => mongoose.connection.close())
  .catch((err) => {
    console.error(err);
    return err;
  });
