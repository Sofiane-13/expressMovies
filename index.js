const mongoose = require('mongoose');

const genres = require('./routes/genres');
const customers = require('./routes/genres');
const movies = require('./routes/movies');
const messagerie = require('./routes/messagerie');


const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost:27017/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/messagerie', messagerie);
app.use('/api/movies', movies);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));