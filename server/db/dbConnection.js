import mongoose from 'mongoose';

const connectToDB = function(address, port, database) {
    const connection_address = 'mongodb://' + address + ':' + port + '/' + database;
    mongoose.connect(connection_address);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'DB connection error:'));
    db.once('open', function() {
        console.log("Connected to mongod server =)");
    });
};

export default connectToDB;
export {mongoose};