import os from 'os';
import fs from 'fs';
import path from 'path';
import express from 'express';
import greenlock from 'greenlock-express';
import logger from 'morgan';
import ngrok from 'ngrok';
import configuration from './Configuration';
import posts from './routes/posts';
import post from './routes/post';
import tags from './routes/tags';
import connectToMongo from './mongoDB/connectToMongo';

const app = express();
const testPort = 5913;
const httpPort = 80;
const httpsPort = 443;
const { pathInfo } = configuration;

app.use(logger('dev', { skip: (req, res) => res.statusCode < 400 })); // console logging
app.use(logger('common', { // file logging
  stream: fs.createWriteStream(path.resolve(pathInfo.root, 'access.log'), { flags: 'a' }),
}));

app.use(express.static(pathInfo.public));

app.use('/posts', posts);
app.use('/post', post);
app.use('/tags', tags);
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(pathInfo.public, 'index.html'));
});

connectToMongo()
  .then(() => {
    if (process.env.SERVER_ENV === 'development') {
      ngrok.connect({
        proto: 'http',
        addr: `localhost:${testPort}`,
      })
        .then(url => console.log('Can test this app with this exported url:', url));
      app.listen(testPort, () => console.log('Express listening on port', testPort));
    } else {
      greenlock.create({
        version: 'draft-11', // Let's Encrypt v2 is ACME draft 11
        server: 'https://acme-v02.api.letsencrypt.org/directory',
        // Note: If at first you don't succeed, switch to staging to debug
        // https://acme-staging-v02.api.letsencrypt.org/directory
        email: 'jinaidy93@gmail.com',
        agreeTos: true,
        approveDomains: ['enhanced.kr'], // NOTE: all domains will validated and listed on the certificate
        configDir: path.join(os.homedir(), 'acme', 'etc'), // You MUST have access to write to directory where certs are saved
        app,
        communityMember: false,
        telemetry: true, // Contribute telemetry data to the project
        renewWithin: 14 * 24 * 60 * 60 * 1000, // certificate renewal may begin at this time
        renewBy: 10 * 24 * 60 * 60 * 1000, // certificate renewal should happen by this time
        // debug: true,
      }).listen(httpPort, httpsPort);
    }
  });
