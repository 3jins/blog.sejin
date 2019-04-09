import testPostDao from './server/mongoDB/dao/testPostDao';
import testTagDao from './server/mongoDB/dao/testTagDao';

export default () => {
  describe('MongoDB', () => {
    testPostDao();
    testTagDao();
  });
};
