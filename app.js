const express = require('express');
const app = express();
//TODO: separate out to support mongodb-memory-server
const db_url = process.env.db_url || 'mongodb://localhost/';
const  db_name = process.env.db_name || 'images';
const db = process.env.NODE_ENV === "test" ? `${db_name}_test` : `${db_name}`;
var mongoose = require('mongoose'),
  Task = require('./api/models/image'),
  bodyParser = require('body-parser');

global.__basedir = __dirname;

mongoose.Promise = global.Promise;
mongoose.connect(db_url + db).then(r =>
  console.info(`connected to mongoDB database: "${db}"`, `collection: "${db_name}"`));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/imageRoutes');
routes(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

module.exports = app;
