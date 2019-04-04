import mongoose from 'mongoose';
import Bluebird from 'bluebird';
import configuration from '../Configuration';

let instance;
class ConnectToMongoSingleton {
  constructor(serverEnv, mongodbConnectionInfo) {
    this.serverEnv = serverEnv;
    this.mongodbConnectionInfo = mongodbConnectionInfo;

    const loadConnectionInfo = () => {
      const { addressList, port, database } = (this.serverEnv === 'development'
        ? this.mongodbConnectionInfo.dev
        : this.mongodbConnectionInfo.prod);
      return { addressList, port, database };
    };

    const makeDatabaseUrlList = (connectionInfo) => {
      const { addressList, port, database } = connectionInfo;
      return addressList.map(address => `mongodb://${address}:${port}/${database}`);
    };

    const connectToMongo = (databaseUrlList) => {
      return databaseUrlList.reduce(async (keepGoing, databaseUrl) => {
        await keepGoing;
        if (!keepGoing) return keepGoing;

        try {
          console.log(`Trying to make a connection through ${databaseUrl}...`);
          await mongoose.connect(databaseUrl, {
            useMongoClient: true,
          });
          console.log(`[+] Connected to the mongodb server through ${databaseUrl} =)`);
          return false;
        } catch (err) {
          console.error(err);
          return true;
        }
      }, true);
    };
    // mongoose.Promise = global.Promise; // See here : http://mongoosejs.com/docs/promises.html
    mongoose.Promise = Bluebird;

    if (instance === undefined) {
      const connectionInfo = loadConnectionInfo();
      const databaseUrlList = makeDatabaseUrlList(connectionInfo);
      instance = connectToMongo(databaseUrlList);
    }
  }
}

const serverEnv = process.env.SERVER_ENV;
const { mongodbConnectionInfo } = configuration;
const connectToMongo = () => {
  (() => new ConnectToMongoSingleton(serverEnv, mongodbConnectionInfo))();
  // It's a meaningless return value indeed.
  // We just need to know if the singleton object is created and the creation process is over.
  return instance;
};

export default connectToMongo;
