import sinon from 'sinon';
import mongoose from 'mongoose';
import MongoMemoryServer from 'mongodb-memory-server';
import testMongoDB from './testMongoDB';
import testScripts from './server/testScripts';
import connectToMock from "./connectToMock";

const mongoServerMock = new MongoMemoryServer();

before(async () => {
  console.log('[+] preprocessing...');
  await connectToMock(mongoServerMock);
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

after(() => {
  console.log('[+] Test is all over. Clearing the mongoServerMock...');
  mongoose.disconnect();
  mongoServerMock.stop();
});

sinon.stub(console, 'error'); // Suppress error message from catch phrases
testMongoDB(mongoServerMock);
testScripts(mongoServerMock);
