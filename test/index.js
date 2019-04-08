import sinon from 'sinon';
import mongoose from 'mongoose';
import MongoMemoryServer from 'mongodb-memory-server';
import FsStub from './FsStub';
import connectToMock from './connectToMock';
import testMongoDB from './testMongoDB';
import testScripts from './server/testScripts';

const mongoServerMock = new MongoMemoryServer();
const fsStub = new FsStub();

before(async () => {
  console.log('[+] preprocessing...');
  sinon.stub(console, 'error'); // Suppress error message from catch phrases
  await connectToMock(mongoServerMock);
  fsStub.init();
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

after(() => {
  console.log('[+] Test is all over. Clearing the stubs and mocks...');
  fsStub.restore();
  mongoose.disconnect();
  mongoServerMock.stop();
});

testMongoDB();
testScripts(fsStub.fakeFileSystem);
