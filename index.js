Joi.objectId = require('joi-objectid')(Joi);
const winston = require('winston');
const config = require('config');
const Joi = require('joi');
const mongoose = require('mongoose');

const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const users = require('./routes/user');
const auth = require('./routes/auth');

const rentals = require('./routes/rental');

const express = require('express');
const app = express();

// handling errors
winston.handleException(
  new winston.transports.File({ filename: 'uncaughtExceptions.log'}));

process.on('unhandledRejection',(ex) => {
  throw ex;
});

// get jwtPrivateKey from variable environement
if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

// connecte to mongoDB
mongoose.connect('mongodb://localhost:27017/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));


// give hand to handel route
app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/users', users)
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/auth', auth);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));