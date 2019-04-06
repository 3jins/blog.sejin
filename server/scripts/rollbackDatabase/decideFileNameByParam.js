import getBackupFileName from './getBackupFileName';

export default (backupPath, param) => {
  if (!param) return getBackupFileName(backupPath, 1);
  if (!Number.isNaN(Number(param))) return getBackupFileName(backupPath, Number(param));
  return param;
};
