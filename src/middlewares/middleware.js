const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Middleware functions
const parseJson = bodyParser.json();
const handleCors = cors();
const secureHeaders = helmet();
const logRequests = morgan('combined');

module.exports = {
  parseJson,
  handleCors,
  secureHeaders,
  logRequests
};