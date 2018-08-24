
const error = require('../middleware/error');
const express = require('express');

const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const users = require('../routes/user');
const auth = require('../routes/auth');
const rentals = require('../routes/rental');

module.exports = function(app) {
    // give hand to handel route
    app.use(express.json());
    app.use('/api/genres', genres);
    app.use('/api/customers', customers);
    app.use('/api/users', users)
    app.use('/api/movies', movies);
    app.use('/api/rentals', rentals);
    app.use('/api/auth', auth);
    app.use(error);
}