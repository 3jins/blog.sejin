import mongoose from 'mongoose';
import Bluebird from 'bluebird';
import configuration from '../Configuration';

class Connection {
  constructor(mongodbConnectionInfo) {
    // mongoose.Promise = global.Promise; // See here : http://mongoosejs.com/docs/promises.html
    mongoose.Promise = Bluebird;

    const loadConnectionInfo = (serverEnv) => {
      const { addressList, port, database } = (serverEnv === 'development'
        ? mongodbConnectionInfo.dev
        : mongodbConnectionInfo.prod);
      return { addressList, port, database };
    };

    const serverEnv = process.argv[2];

    this.connectionInfo = loadConnectionInfo(serverEnv);
  }

  open() {
    const { addressList, port, database } = this.connectionInfo;
    addressList.reduce(async (keepGoing, address) => {
      await keepGoing;
      if (!keepGoing) return keepGoing;

      const dbURL = `mongodb://${address}:${port}/${database}`;
      try {
        console.log(`Trying to make a connection through ${dbURL}...`);
        await mongoose.connect(dbURL, {
          useMongoClient: true,
        });
        console.log(`[+] Connected to the mongodb server through ${dbURL} =)`);
        return false;
      } catch (err) {
        console.log(err);
        return true;
      }
    }, true);
  }
}

const connection = new Connection(configuration.mongodbConnectionInfo);
export default connection;
