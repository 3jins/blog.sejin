import testPostDao from './server/mongoDB/dao/testPostDao';

export default () => {
  describe('MongoDB', () => {
    testPostDao();
    // testTagDao();
  });
};
