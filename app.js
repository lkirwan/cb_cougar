const express = require('express');
const app = express();
const dbImpl = process.env.DB_IMPL || 'mongoDB';
const bodyParser = require('body-parser');

require('./db/' + dbImpl);
require('./api/models/image');

var numberUtils = require('./lib/number');
exports.Number = numberUtils;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/imageRoutes');
routes(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

module.exports = app;
