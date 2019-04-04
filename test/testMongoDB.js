import mongoose from 'mongoose';
import Bluebird from 'bluebird';
import MongoMemoryServer from 'mongodb-memory-server';
import Post from '../server/mongoDB/models/Post';
import Category from '../server/mongoDB/models/Category';
import Series from '../server/mongoDB/models/Series';
import Tag from '../server/mongoDB/models/Tag';
import testPostDao from './server/mongoDB/dao/testPostDao';
import testTagDao from './server/mongoDB/dao/testTagDao';

const modelsMock = {};
const mongoServer = new MongoMemoryServer();
const option = { useMongoClient: true };

export default () => {
  describe('MongoDB', () => {
    before((done) => {
      console.log('[+] preprocessing...');
      mongoose.Promise = Bluebird;
      mongoServer
        .getConnectionString()
        .then(dbURL => mongoose.connect(dbURL, option))
        .then(() => {
          modelsMock.Post = Post;
          modelsMock.Category = Category;
          modelsMock.Series = Series;
          modelsMock.Tag = Tag;
          done();
        }, err => done(err));
    });

    testPostDao();
    // testTagDao();

    after(() => {
      console.log('[+] MongoDB test is over. Stopping the mongoServer mock...');
      mongoose.disconnect();
      mongoServer.stop();
    });
  });
};
