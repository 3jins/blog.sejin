import * as Dao from '../../../../server/mongoDB/dao';
import getFileList from '../../../../server/scripts/syncDatabase/getFileList';
import syncPosts from '../../../../server/scripts/syncDatabase/syncPosts';

export default (fakeFileSystem) => {
  describe('syncPosts', () => {
    const testFilesInFakeFileSystem = (title, fakeFileObject, test) => {
      if (fakeFileObject.name.startsWith(title)) {
        return test({
          content: fakeFileObject.content,
          numTags: (fakeFileObject.name.match(/#/g) || []).length,
        });
      }
      if (fakeFileObject.stat !== 'directory') return null;
      return fakeFileObject.children.forEach(
        fakeFileObjectChild => testFilesInFakeFileSystem(title, fakeFileObjectChild, test),
      );
    };

    let fakeFileList;

    before(async () => {
      fakeFileList = await getFileList('fakeRoot');
    });

    it('adds all files in a specific path to database', async () => {
      const numExistingPosts = (await Dao.PostDao.findAllPosts()).length;
      await Promise.all(syncPosts(fakeFileList));
      const postList = await Dao.PostDao.findAllPosts();
      const numPosts = postList.length;

      (numPosts - numExistingPosts).should.equal(fakeFileList.length);

      postList.forEach((post) => {
        const { title, content, tags } = post;
        testFilesInFakeFileSystem(title, fakeFileSystem.getFileObject('fakeRoot'), (fakeFile) => {
          fakeFile.content.should.equal(content);
          fakeFile.numTags.should.equal(tags.length);
        });
      });
    });
  });
};
