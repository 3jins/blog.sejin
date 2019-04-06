import path from 'path';
import fs from 'fs';
import * as Dao from '../../mongoDB/dao';
import refineFileInfo from './refineFileInfo';

export default fileList => fileList.map(async (fileInfo) => {
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
