import mongoose from 'mongoose';
import connectToMongo from '../../mongoDB/connectToMongo';
import Configuration from '../../Configuration';
import getFileList from './getFileList';
import buildSitemap from '../buildSitemap';
import backupDatabase from '../backupDatabase';
import syncPosts from './syncPosts';
import syncTags from './syncTags';

const { pathInfo } = Configuration;
connectToMongo();

getFileList(pathInfo.mdFiles)
  .then(async (fileList) => {
    await Promise.all(syncPosts(fileList));
    await Promise.all(syncTags(fileList));
    await buildSitemap();
    await backupDatabase();
    mongoose.connection.close();
  });
