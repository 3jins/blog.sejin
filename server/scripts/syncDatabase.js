import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import mongoose from 'mongoose';
import * as Bluebird from 'bluebird';
import configuration from '../Configuration';
import * as Dao from '../mongoDB/dao';
import buildSitemap from './buildSitemap';
import backupDatabase from './backupDatabase';

const { pathInfo } = configuration;
Bluebird.promisifyAll(fs);

const peelExtension = (name) => {
  const idx = name.lastIndexOf('.');
  return name.substring(0, idx);
};

const extractInfo = (rawString, separator) => {
  const extractionResult = { rest: rawString, infoList: [] };
  const lenSeparator = separator.length;
  let idx = rawString.lastIndexOf(separator);
  let lastIdx = rawString.length;
  while (idx >= 0) {
    extractionResult.rest = rawString.substring(0, idx);
    extractionResult.infoList.unshift(rawString.substring(idx + lenSeparator, lastIdx));
    lastIdx = idx;
    idx = extractionResult.rest.lastIndexOf(separator);
  }
  return extractionResult;
};

const refineFileInfo = (fileName) => {
  const nameWithoutExt = peelExtension(fileName);
  const { rest: nameWithoutTags, infoList: tags } = extractInfo(nameWithoutExt, '#');
  const { rest: nameWithoutSeries, infoList: [series] } = extractInfo(nameWithoutTags, '$$');
  const { rest: title, infoList: [category] } = extractInfo(nameWithoutSeries, '@@');

  return {
    title, category, series, tags,
  };
};

const getFileList = async (curPath, belongToMajor = null, belongToMinor = null) => {
  const fileNameList = await fs.readdirAsync(curPath);
  return fileNameList.reduce(async (fileList, fileName) => {
    if (fileName === '.git') return fileList;
    const fullPath = path.resolve(curPath, fileName);
    const stats = await fs.statAsync(fullPath);

    if (!stats.isDirectory()) {
      (await fileList).push({
        curPath, fileName, belongToMajor, belongToMinor,
      });
      return fileList;
    }

    if (belongToMajor === null) { // depth: 0
      return (await fileList).concat(await getFileList(fullPath, fileName));
    }
    if (belongToMinor === null) { // depth: 1
      return (await fileList)
        .concat(await getFileList(fullPath, belongToMajor, fileName.substr(1)));
    }
    return (await fileList).concat(await getFileList(fullPath, belongToMajor, belongToMinor));
  }, []);
};

const syncPosts = fileList => fileList.map(async (fileInfo) => {
  const {
    curPath, fileName, belongToMajor, belongToMinor,
  } = fileInfo;
  const {
    title, /* category, series, */ tags,
  } = refineFileInfo(fileName);
  const fullPath = path.resolve(curPath, fileName);
  const content = await fs.readFileAsync(fullPath, 'utf8');
  const dateUpdated = new Date().getTime();

  await Dao.PostDao.upsertPost({
    title, dateUpdated, content, belongToMajor, belongToMinor, tags,
  });
});

const syncTags = (fileList) => {
  const filesByTag = fileList
    .reduce((filesByTag, fileInfo) => {
      const { fileName, belongToMinor } = fileInfo;
      const { title, tags } = refineFileInfo(fileName);
      tags.forEach((tag) => {
        if (tag in filesByTag) {
          filesByTag[tag].postList.push(title);
          filesByTag[tag].belongToMinorList.push(belongToMinor);
        } else {
          filesByTag[tag] = { postList: [title], belongToMinorList: [belongToMinor] };
        }
      });
      return filesByTag;
    }, {});
  return _.map(filesByTag, (tag, tagName) => Dao.TagDao.upsertTag({
    tagName,
    postList: tag.postList,
    belongToMinorList: tag.belongToMinorList,
  }));
};

getFileList(pathInfo.mdFiles)
  .then(async (fileList) => {
    await Promise.all(syncPosts(fileList));
    await Promise.all(syncTags(fileList));
    await buildSitemap();
    await backupDatabase();
    mongoose.connection.close();
  });
