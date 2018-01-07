import mongoose from 'mongoose';

const connectToDB = function(address, address2, port, database) {
    let connection_address = 'mongodb://' + address + ':' + port + '/' + database;
    mongoose.connect(connection_address);
    const db = mongoose.connection;
    db.once('error', function() {
        connection_address = 'mongodb://' + address2 + ':' + port + '/' + database;
        mongoose.connect(connection_address);
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'DB connection error:'));
    });
    db.once('open', function() {
        console.log("Connected to mongod server through " + connection_address + "  =)");
    });
};

export default connectToDB;
export {mongoose};