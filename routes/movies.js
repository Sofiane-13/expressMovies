const auth = require('../middleware/auth');
const {Movies, validate} = require('../models/movies');
const {Genre} = require('../models/genre')
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const movies = await Movies.find().sort('name');
  res.send(movies);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre');

  const movie = new Movies({ 
  title: req.body.title,
  genre: {
  _id: genre._id,
  name: genre.name
  }, 
  numberInStock: req.body.numberInStock,
  dailyRentalRate: req.body.dailyRentalRate
});
  await movie.save();
  
  res.send(movie);
});

router.put('/:id', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const movie = await Movies.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  });

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  
  res.send(movie);
});

router.delete('/:id', auth, async (req, res) => {
  const movie = await Movies.findByIdAndRemove(req.params.id);

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');

  res.send(movie);
});

router.get('/:id', async (req, res) => {
  const movie = await Movies.findById(req.params.id);

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');

  res.send(movie);
});

module.exports = router;