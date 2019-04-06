import fs from 'fs';
import path from 'path';

export default (backupPath, backupFileName) => fs.readFileAsync(
  path.resolve(backupPath, backupFileName),
);
