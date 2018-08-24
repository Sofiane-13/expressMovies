require('express-async-errors');
const winston = require('winston');
const express = require('express');
const app = express();

// Call the startup functions.
require('./startup/winstonHandlingError');
require('./startup/routes')(app);
require('./startup/jwtPrivateKey')();
require('./startup/connexionMongoDB')();
require('./startup/validation')();
// run the function on port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));