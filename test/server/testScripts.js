import testSyncDatabase from './scripts/syncDatabase/testSyncDatabase';

export default (fakeFileSystem) => {
  describe('scripts', async () => {
    testSyncDatabase(fakeFileSystem);
    // testRollbackDatabase();
    // testDeleteDatabase(fakeFileList);
  });
};
