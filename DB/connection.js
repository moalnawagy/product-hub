const mongoose = require('mongoose')

const connectDB = () => {
    return mongoose.connect(process.env.DBLink).then((result) => {
        console.log(`DB connected on ....... ${result.connections[0].host}`);
    }).catch(err => console.log('fail to connect DB', err))
}

const { createClient } = require('redis');

const reddisClient = createClient();

reddisClient.on('error', (err) => console.log('Redis Client Error', err));


module.exports = { connectDB, reddisClient }