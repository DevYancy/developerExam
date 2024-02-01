const { MongoClient } = require('mongodb');
const async = require("async");
const config = require("./config");

module.exports. connectToCluster = async (uri) => {
    let mongoClient;
    try {
        mongoClient = new MongoClient(uri);
        console.log('Connecting to MongoDB Atlas cluster...');
        await mongoClient.connect();
        console.log('Successfully connected to MongoDB Atlas!');
 
        return mongoClient;
    } catch (error) {
        console.error('Connection to MongoDB Atlas failed!', error);
        process.exit();
    }
 }

