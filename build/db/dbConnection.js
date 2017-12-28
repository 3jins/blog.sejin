'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mongoose = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connectToDB = function connectToDB(address, port, database) {
    var connection_address = 'mongodb://' + address + ':' + port + '/' + database;
    _mongoose2.default.connect(connection_address);
    var db = _mongoose2.default.connection;
    db.on('error', console.error.bind(console, 'DB connection error:'));
    db.once('open', function () {
        console.log("Connected to mongod server =)");
    });
};

exports.default = connectToDB;
exports.mongoose = _mongoose2.default;