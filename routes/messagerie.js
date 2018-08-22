const {Messagerie, validate} = require('../models/messagerie'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const messagerie = await Messagerie.find().sort('nameFirstUser');
  res.send(messagerie);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let messagerie = new Messagerie({ 
    nameFirstUser: req.body.nameFirstUser,
    nameSecondUser: req.body.nameSecondUser,
    message: req.body.message
  });
  messagerie = await messagerie.save();
  
  res.send(messagerie);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const messagerie = await Messagerie.findByIdAndUpdate(req.params.id,
    { 
        nameFirstUser: req.body.nameFirstUser,
        nameSecondUser: req.body.nameSecondUser,
        message: req.body.message
    }, { new: true });

  if (!messagerie) return res.status(404).send('The messagerie with the given ID was not found.');
  
  res.send(messagerie);
});

router.delete('/:id', async (req, res) => {
  const messagerie = await Messagerie.findByIdAndRemove(req.params.id);

  if (!messagerie) return res.status(404).send('The customer with the given ID was not found.');

  res.send(messagerie);
});

router.get('/:id', async (req, res) => {
  const messagerie = await Messagerie.findById(req.params.id);

  if (!messagerie) return res.status(404).send('The messagerie with the given ID was not found.');

  res.send(messagerie);
});

module.exports = router; 