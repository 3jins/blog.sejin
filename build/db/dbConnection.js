'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mongoose = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise; // See here : http://mongoosejs.com/docs/promises.html

var connectToDB = function connectToDB(address, address2, port, database) {
    var connectionAddress = 'mongodb://' + address + ':' + port + '/' + database;
    var mongodbOptions = {
        useMongoClient: true
    };
    _mongoose2.default.connect(connectionAddress, mongodbOptions);
    var db = _mongoose2.default.connection;
    db.once('error', function () {
        connectionAddress = 'mongodb://' + address2 + ':' + port + '/' + database;
        _mongoose2.default.connect(connectionAddress, mongodbOptions);
        var db = _mongoose2.default.connection;
        db.on('error', console.error.bind(console, 'DB connection error:'));
    });
    db.once('open', function () {
        console.log("Connected to mongod server through " + connectionAddress + "  =)");
    });
};

exports.default = connectToDB;
exports.mongoose = _mongoose2.default;