import path from 'path';

class Configuration {
  constructor() {
    this.mongodbConnectionInfo = {
      dev: {
        addressList: ['localhost'],
        port: 27017,
        database: 'blog',
      },
      prod: {
        addressList: ['172.18.0.3', '172.18.0.2'],
        port: 27017,
        database: 'blog',
      },
    };

    const rootPath = path.resolve(__dirname, '..', '..');
    this.pathInfo = {
      root: rootPath,
      mdFiles: path.resolve(rootPath, 'md_files'),
      public: path.resolve(rootPath, 'public'),
      backup: path.resolve(rootPath, 'backup'),
    };
  }
}

const configuration = new Configuration();
export default configuration;
