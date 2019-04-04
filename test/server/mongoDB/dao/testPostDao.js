import chai from 'chai';
import * as PostDao from '../../../../server/mongoDB/dao/PostDao';

chai.should();

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
    });
  });
};
