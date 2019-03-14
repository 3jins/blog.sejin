import mongoose from 'mongoose';
import { mongodbConnectionInfo } from '../config';

mongoose.Promise = global.Promise; // See here : http://mongoosejs.com/docs/promises.html

const loadConnectionInfo = (serverEnv) => {
  const { addressList, port, database } = (serverEnv === 'development'
    ? mongodbConnectionInfo.dev
    : mongodbConnectionInfo.prod);
  return { addressList, port, database };
};

const makeConnection = (addressList, port, database) => {
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
};

export { loadConnectionInfo, makeConnection };
