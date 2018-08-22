const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  name: String,
});

const Genres = mongoose.model('Genre', genreSchema);

const Movies = mongoose.model('Movies', new mongoose.Schema({
  title: String,
  genre: [genreSchema],
  numberInStock: Number,
  dailyRentalRate: Number
}));

function validateMovie(movies) {
  const schema = {
    title: Joi.string().min(3).required(),
    genre: {
      name: Joi.string().min(3).required()
    },
    numberInStock: Joi.number(),
    dailyRentalRate: Joi.number()
  };

  return Joi.validate(movies, schema);
}

exports.Movies = Movies; 
exports.Genres = Genres;
exports.validate = validateMovie;