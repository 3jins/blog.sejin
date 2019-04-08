import testSyncPosts from './testSyncPosts';
import testSyncTags from './testSyncTags';

export default (fakeFileSystem) => {
  describe('syncDatabase', () => {
    testSyncPosts(fakeFileSystem);
    testSyncTags(fakeFileSystem);
  });
};
