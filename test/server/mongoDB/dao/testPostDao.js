import * as PostDao from '../../../../server/mongoDB/dao/PostDao';

export default () => {
  describe('PostDao', () => {
    describe('findAllPosts', () => {
    });
    describe('upsertPost', () => {
      const brokenObj = {
        dateUpdated: new Date().getTime(),
        content: ''.padStart(1025, '본문'),
        belongToMajor: 'blog',
        belongToMinor: 'tech',
        tags: ['태그1', '태그2', '태그3'],
      };
      const healthyObj = Object.assign({}, brokenObj);
      healthyObj.title = '제목';
      const updatedHealthyObj = Object.assign({}, healthyObj);
      updatedHealthyObj.content = '짧아진 본문';

      it('inserts a new document to DB', async () => {
        await PostDao.upsertPost(healthyObj);
        const postList = await PostDao.findAllPosts();
        postList.should.have.lengthOf(1);
        postList[0].postNo.should.equal(1);
        postList[0].content.should.equal(healthyObj.content);
      });
      it('tries to insert an existing document to DB', async () => {
        await PostDao.upsertPost(healthyObj);
        await PostDao.upsertPost(updatedHealthyObj);
        const postList = await PostDao.findAllPosts();
        postList.should.have.lengthOf(1);
        postList[0].postNo.should.equal(1);
        postList[0].content.should.equal(updatedHealthyObj.content);
      });
      it('catches error when arguments are coming in wrong format', (done) => {
        PostDao.upsertPost(brokenObj)
          .then((err) => {
            err.name.should.equal('ValidationError');
            done();
          });
      });
      it('tries to insert a given value as a postNo', async () => {
        const postObjList = [
          { ...updatedHealthyObj, title: '제목3', postNo: 3 },
          { ...updatedHealthyObj, title: '제목1', postNo: 1 },
          { ...updatedHealthyObj, title: '제목2', postNo: 2 },
          { ...updatedHealthyObj, title: '제목4' }, // postNo should automatically increase if there's no given postNo
        ];
        await postObjList.reduce(async (lastPostObj, postObj) => {
          await lastPostObj;
          return PostDao.upsertPost(postObj);
        }, null);
        const postList = await PostDao.findAllPosts();
        postList.forEach((post) => {
          const { title, postNo } = post;
          title.should.equal(`제목${postNo}`);
        });
      });
    });
    describe('removePosts', () => {
    });
    describe('countPosts', () => {
      const testObj = {
        title: '제목',
        dateUpdated: new Date().getTime(),
        content: '걍 본문이다',
        belongToMajor: 'blog',
        belongToMinor: 'tech',
        tags: ['태그1', '태그2', '태그3'],
      };
      const postObjList = [
        { ...testObj, title: '제목3', postNo: 3 },
        { ...testObj, title: '제목4', postNo: 4 },
        { ...testObj, title: '제목2', postNo: 2 },
      ];
      it('gets the number of documents', async () => {
        await Promise.all(postObjList.map(postObj => PostDao.upsertPost(postObj)));
        // TODO(3jins): Add `PostDao.removePost` for this test
        const numPosts = await PostDao.countPosts();
        numPosts.should.equal(postObjList.length);
      });
      it('gets the number of documents with specific belongToMinor', async () => {
        const additionalPostList = [{
          ...testObj,
          title: '제목6',
          postNo: 6,
          belongToMinor: 'life',
        }];
        await Promise.all(postObjList.concat(additionalPostList)
          .map(postObj => PostDao.upsertPost(postObj)));

        const numTechPosts = await PostDao.countPosts({ belongToMinor: 'tech' });
        const numLifePosts = await PostDao.countPosts({ belongToMinor: 'life' });

        numTechPosts.should.equal(postObjList.length);
        numLifePosts.should.equal(additionalPostList.length);
      });
      it('gets the number of documents with specific belongToMinor and specific tag', async () => {
        const additionalPostList = [{
          ...testObj,
          title: '제목6',
          postNo: 6,
          belongToMinor: 'life',
        }, {
          ...testObj,
          title: '제목7',
          postNo: 7,
          belongToMinor: 'life',
          tags: ['태그1'],
        }];
        const numTag2PostsShouldBe = postObjList.concat(additionalPostList).reduce(
          (_numTag2Posts, postObj) => (postObj.tags.includes('태그2')
            ? _numTag2Posts + 1
            : _numTag2Posts),
          0,
        );
        const numLifeTag2PostsShouldBe = postObjList.concat(additionalPostList).reduce(
          (_numTag2Posts, postObj) => (postObj.belongToMinor === 'life' && postObj.tags.includes('태그2')
            ? _numTag2Posts + 1
            : _numTag2Posts),
          0,
        );

        await Promise.all(postObjList.concat(additionalPostList)
          .map(additionalPost => PostDao.upsertPost(additionalPost)));

        const numTag2Posts = await PostDao.countPosts({ tags: { $all: ['태그2'] } });
        const numLifeTag2Posts = await PostDao.countPosts({
          belongToMinor: 'life',
          tags: { $all: ['태그2'] },
        });

        numTag2Posts.should.equal(numTag2PostsShouldBe);
        numLifeTag2Posts.should.equal(numLifeTag2PostsShouldBe);
      });
    });
  });
};
