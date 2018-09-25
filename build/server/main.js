'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _greenlockExpress = require('greenlock-express');

var _greenlockExpress2 = _interopRequireDefault(_greenlockExpress);

var _posts = require('./routes/posts');

var _posts2 = _interopRequireDefault(_posts);

var _post = require('./routes/post');

var _post2 = _interopRequireDefault(_post);

var _tags = require('./routes/tags');

var _tags2 = _interopRequireDefault(_tags);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var testPort = 5913;
var httpPort = 80;
var httpsPort = 443;
var publicPath = _path2.default.resolve(__dirname, "../../public"); // Directory would be deeper one step when it is transpiled.

app.use(_express2.default.static(publicPath));
app.use('/posts', _posts2.default);
app.use('/post', _post2.default);
app.use('/tags', _tags2.default);
app.get('/*', function (req, res) {
    res.sendFile(_path2.default.resolve(publicPath, "index.html"));
});

if (process.env.SERVER_ENV === 'development') {
    // ngrok
    var ngrok = require('ngrok');
    (async function () {
        return await ngrok.connect({
            proto: 'http',
            addr: '192.168.99.100:' + testPort
        });
    })().then(function (url) {
        console.log('Can test this app with this exported url:', url);
    });

    // open
    app.listen(testPort, function () {
        console.log('Express listening on port', testPort);
    });
} else {
    _greenlockExpress2.default.create({
        // Let's Encrypt v2 is ACME draft 11
        version: 'draft-11',

        server: 'https://acme-v02.api.letsencrypt.org/directory'
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
        , configDir: _path2.default.join(require('os').homedir(), 'acme', 'etc'),

        app: app

        // Join the community to get notified of important updates and help me make greenlock better
        , communityMember: false

        // Contribute telemetry data to the project
        , telemetry: true

        // certificate renewal may begin at this time
        , renewWithin: 14 * 24 * 60 * 60 * 1000

        // certificate renewal should happen by this time
        , renewBy: 10 * 24 * 60 * 60 * 1000

        //, debug: true
    }).listen(httpPort, httpsPort);
}