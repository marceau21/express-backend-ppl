const express = require('express');
const app = express();
const winston = require('winston')


require('./startup/db')();
require('./startup/logging')();


const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  winston.info(`Listening to port ${port}...`);
});

module.exports = server;
