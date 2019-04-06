import fs from 'fs';

export default (backupPath, order) => {
  const fileList = fs.readdirSync(backupPath);
  fileList.sort().reverse();
  return fileList[order - 1];
};
