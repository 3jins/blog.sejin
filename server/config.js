export const mongodbConnectionInfo = {
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
