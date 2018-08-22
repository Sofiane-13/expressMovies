const Joi = require('joi');
const mongoose = require('mongoose');

const Messagerie = mongoose.model('messagerie', new mongoose.Schema({
  nameFirstUser: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  nameSecondUser: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  message: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 250
  }
}));

function validateMessagerie(Messagerie) {
  const schema = {
    nameFirstUser: Joi.string().min(2).max(50).required(),
    nameSecondUser: Joi.string().min(2).max(50).required(),
    message: Joi.string().min(1).max(250).required(),

  };

  return Joi.validate(Messagerie, schema);
}

exports.Messagerie = Messagerie; 
exports.validate = validateMessagerie;