import * as TagDao from '../../../../server/mongoDB/dao/TagDao';

export default () => {
  describe('TagDao', () => {
    describe('upsertTag', () => {
      it('inserts a same tag multiple times with different posts and same belongToMinor', async () => {
        const tagObjList = [
          {
            tagName: 'test tag',
            postList: ['post1'],
            belongToMinorList: ['tech'],
          }, {
            tagName: 'test tag',
            postList: ['post2'],
            belongToMinorList: ['tech'],
          }, {
            tagName: 'test tag',
            postList: ['post3'],
            belongToMinorList: ['tech'],
          },
        ];

        await tagObjList.reduce(async (lastTagObj, tagObj) => {
          await lastTagObj;
          return TagDao.upsertTag(tagObj);
        }, null);
        const tag = (await TagDao.findTag({ tagName: 'test tag' }))[0];
        tag.postList.should.have.lengthOf(tagObjList.length);
        tag.belongToMinorList.should.have.lengthOf(1);
      });
    });
  });
};
