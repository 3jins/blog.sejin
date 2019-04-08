import mongoose from 'mongoose';
import Bluebird from 'bluebird';

let instance;
class ConnectionMockSingleton {
  constructor(mongoServerMock) {
    const connectToMock = (mongoServerMock) => {
      const option = { useMongoClient: true };
      mongoose.Promise = Bluebird;

      return mongoServerMock
        .getConnectionString()
        .then(dbURL => mongoose.connect(dbURL, option), (err) => {
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
