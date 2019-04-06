import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import * as Bluebird from 'bluebird';
import configuration from '../../Configuration';
import connectToMongo from '../../mongoDB/connectToMongo';
import decideFileNameByParam from './decideFileNameByParam';
import rollbackDatabase from './rollbackDatabase';

Bluebird.promisifyAll(fs);

const param = process.argv[2];

connectToMongo()
  .then(() => {
    const backupPath = configuration.pathInfo.backup;
    const fileName = decideFileNameByParam(backupPath, param);
    return fs.readFileAsync(path.resolve(backupPath, fileName));
  })
  .then(backupData => rollbackDatabase(backupData))
  .then(() => mongoose.connection.close())
  .catch((err) => {
    console.error(err);
    return err;
  });
