import * as Dao from '../../../../server/mongoDB/dao';
import getFileList from '../../../../server/scripts/syncDatabase/getFileList';
import syncTags from '../../../../server/scripts/syncDatabase/syncTags';

export default (fakeFileSystem) => {
  describe('syncTags', () => {
    const getNumFilesHavingTagsFromFakeFileSystem = (fakeFileObject, count = 0) => {
      if (fakeFileObject.stat !== 'directory') return fakeFileObject.name.includes('#') ? count + 1 : count;
      return count + fakeFileObject.children
        .map(childObject => getNumFilesHavingTagsFromFakeFileSystem(childObject, count))
        .reduce((total, numFiles) => total + numFiles, 0);
    };

    let fakeFileList;

    before(async () => {
      fakeFileList = await getFileList('fakeRoot');
    });

    it('adds all tags in a specific path to database', async () => {
      const numFilesFromFakeFileSystem = getNumFilesHavingTagsFromFakeFileSystem(fakeFileSystem.getFileObject('fakeRoot'));
      await Promise.all(syncTags(fakeFileList));
      const tagList = await Dao.TagDao.findAllTags();
      const postSetInTagList = tagList.reduce((postSet, tag) => {
        const { postList } = tag;
        postList.forEach(post => postSet.add(post));
        return postSet;
      }, new Set());

      postSetInTagList.size.should.equal(numFilesFromFakeFileSystem);
    });
  });
};
