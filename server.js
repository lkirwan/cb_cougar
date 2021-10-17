var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  db_url = process.env.db_url || 'mongodb://localhost/',
  db_name = process.env.db_name || 'Images',
  mongoose = require('mongoose'),
  Task = require('./api/models/image'),
  bodyParser = require('body-parser');

global.__basedir = __dirname;

mongoose.Promise = global.Promise;
mongoose.connect(db_url + db_name);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser());


var routes = require('./api/routes/imageRoutes');
routes(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('API server started on: ' + port);
