import mongoose from 'mongoose';
import Bluebird from 'bluebird';

let instance;
class ConnectionMockSingleton {
  constructor(mongoServerMock) {
    const connectToMock = (mongoServerMock) => {
      mongoose.Promise = Bluebird;

      return mongoServerMock
        .getConnectionString()
        .then(dbURL => mongoose.connect(dbURL, {
          useCreateIndex: true,
          useNewUrlParser: true,
        }), (err) => {
          console.error(err);
          return err;
        });
    };

    if (!instance) {
      instance = connectToMock(mongoServerMock);
    }
  }
}

const connectToMock = (mongoServerMock) => {
  (() => new ConnectionMockSingleton(mongoServerMock))();
  return instance;
};

export default connectToMock;
