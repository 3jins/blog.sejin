import express from 'express';
import greenlock from 'greenlock-express';
import posts from './routes/posts';
import post from './routes/post';
import tags from './routes/tags';
import path from 'path';
import ngrok from 'ngrok';

const app = express();
const testPort = 5913;
const httpPort = 80;
const httpsPort = 443;
const publicPath = path.resolve(__dirname, "../../public");   // Directory would be deeper one step when it is transpiled.

app.use(express.static(publicPath));
app.use('/posts', posts);
app.use('/post', post);
app.use('/tags', tags);
app.get('/*', (req, res) => {
    res.sendFile(path.resolve(publicPath, "index.html"));
});

if(process.env.SERVER_ENV === 'development') {
    // ngrok
    (async () => {
        return await ngrok.connect({
            proto: 'http',
            addr: '192.168.99.100:' + testPort,
        });
    })().then((url) => {
        console.log('Can test this app with this exported url:', url);
    });

    // open
    app.listen(testPort, () => {
        console.log('Express listening on port', testPort);
    });
} else {
    greenlock.create({
        // Let's Encrypt v2 is ACME draft 11
        version: 'draft-11'

        , server: 'https://acme-v02.api.letsencrypt.org/directory'
        // Note: If at first you don't succeed, switch to staging to debug
        // https://acme-staging-v02.api.letsencrypt.org/directory

        // You MUST change this to a valid email address
        , email: 'jinaidy93@gmail.com'

        // You MUST NOT build clients that accept the ToS without asking the user
        , agreeTos: true

        // You MUST change these to valid domains
        // NOTE: all domains will validated and listed on the certificate
        , approveDomains: ['enhanced.kr']

        // You MUST have access to write to directory where certs are saved
        // ex: /home/foouser/acme/etc
        , configDir: path.join(require('os').homedir(), 'acme', 'etc')

        , app: app

        // Join the community to get notified of important updates and help me make greenlock better
        , communityMember: false

        // Contribute telemetry data to the project
        , telemetry: true

    //, debug: true

    }).listen(httpPort, httpsPort);
}
