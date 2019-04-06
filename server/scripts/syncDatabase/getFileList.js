import fs from 'fs';
import path from 'path';
import * as Bluebird from 'bluebird';

Bluebird.promisifyAll(fs);

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

export default getFileList;
