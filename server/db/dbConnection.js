import mongoose from 'mongoose';

mongoose.Promise = global.Promise;  // See here : http://mongoosejs.com/docs/promises.html

const connectToDB = function(address, address2, port, database) {
    let connectionAddress = 'mongodb://' + address + ':' + port + '/' + database;
    const mongodbOptions = {
        useMongoClient: true,
    };
    mongoose.connect(connectionAddress, mongodbOptions);
    const db = mongoose.connection;
    db.once('error', function() {
        connectionAddress = 'mongodb://' + address2 + ':' + port + '/' + database;
        mongoose.connect(connectionAddress, mongodbOptions);
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'DB connection error:'));
    });
    db.once('open', function() {
        console.log("Connected to mongod server through " + connectionAddress + "  =)");
    });
};

export default connectToDB;
export {mongoose};