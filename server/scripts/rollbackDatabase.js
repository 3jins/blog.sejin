import fs from 'fs';
import path from 'path';
import * as Bluebird from 'bluebird';
import mongoose from 'mongoose';
import configuration from '../Configuration';
import * as Dao from '../mongoDB/dao';

Bluebird.promisifyAll(fs);

const getBackupFileName = (backupPath, order) => {
  const fileList = fs.readdirSync(backupPath);
  fileList.sort();
  return fileList[order - 1];
};

// TODO(sejin): Reconsider the function name
const decideFileNameByParam = (backupPath, param) => {
  if (!param) return getBackupFileName(backupPath, 1);
  if (!Number.isNaN(Number(param))) return getBackupFileName(backupPath, Number(param));
  return param;
};

const getBackupData = (backupPath, backupFileName) => fs.readFileAsync(
  path.resolve(backupPath, backupFileName),
);

const rollbackDatabase = async (backupData) => {
  const backupObj = JSON.parse(String(backupData));
  const { posts, tags } = backupObj;
  await Promise.all(posts.map(postObj => Dao.PostDao.upsertPost(postObj, true)));
  await Promise.all(tags.map(tagObj => Dao.TagDao.upsertTag(tagObj)));
};

const backupPath = configuration.pathInfo.backup;
const param = process.argv[3];

const fileName = decideFileNameByParam(backupPath, param);
getBackupData(backupPath, fileName)
  .then(backupData => rollbackDatabase(backupData))
  .then(() => mongoose.connection.close())
  .catch(err => console.log(err));
