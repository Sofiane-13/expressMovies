const {Movies, Genres, validate} = require('../models/movies');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const movies = await Movies.find().sort('name');
  res.send(movies);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let movie = new Movies({ title: req.body.title ,genre: new Genres( { name : req.body.genre.name}), numberInStock: req.body.numberInStock,dailyRentalRate: req.body.dailyRentalRate});
  movie = await movie.save();
  
  res.send(movie);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const movie = await Movies.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  });

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  
  res.send(movie);
});

router.delete('/:id', async (req, res) => {
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