const config = require('config');

module.exports = function () {
    // get jwtPrivateKey from variable environement
    if (!config.get('jwtPrivateKey')) {
        console.error('FATAL ERROR: jwtPrivateKey is not defined.');
        process.exit(1);
    }

}