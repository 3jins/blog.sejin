import fs from 'fs';
import * as Bluebird from 'bluebird';
import testSyncDatabase from './scripts/syncDatabase/testSyncDatabase';

export default (fakeFileSystem) => {
  describe('scripts', async () => {
    before(() => Bluebird.promisifyAll(fs));

    testSyncDatabase(fakeFileSystem);
    // testRollbackDatabase();
    // testDeleteDatabase(fakeFileList);
  });
};
