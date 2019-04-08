import fs from 'fs';
import sinon from 'sinon';
import FakeFileSystem from './FakeFileSystem';

export default class FsStub {
  constructor() {
    this.fakeFileSystem = new FakeFileSystem();
  }

  init() {
    sinon.stub(fs, 'readdir')
      .callsFake((fullPath, callback) => {
        try {
          callback(
            null,
            this.fakeFileSystem.getFileObject(fullPath).children
              .map(child => child.name),
          );
        } catch (err) {
          callback(err);
        }
      });
    sinon.stub(fs, 'readFile')
      .callsFake((fullPath, options, callback) => {
        callback = typeof options === 'function' ? options : callback; // https://github.com/nodejs/node/blob/29867f35d89c9cc0ef1ea7dfdecd6361dc00a7c1/lib/fs.js#L777
        try {
          callback(null, this.fakeFileSystem.getFileObject(fullPath).content);
        } catch (err) {
          callback(err);
        }
      });
    sinon.stub(fs, 'stat')
      .callsFake((fullPath, callback) => {
        try {
          const fileObject = this.fakeFileSystem.getFileObject(fullPath);
          callback(null, {
            isDirectory: () => (fileObject.stat === 'directory'),
          });
        } catch (err) {
          callback(err);
        }
      });
  }

  restore() {
    sinon.restore();
  }
}
