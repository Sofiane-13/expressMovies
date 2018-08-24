const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function () {

    // connecte to mongoDB
    mongoose.connect('mongodb://localhost:27017/vidly')
        .then(() => winston.info('Connected to MongoDB...'));
}