

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const app = express();

// Call the startup functions.
require('./startup/winstonHandlingError');
require('./startup/routes')(app);
require('./startup/jwtPrivateKey')();
require('./startup/connexionMongoDB')();

// run the function on port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));