const db_url = process.env.db_url || 'mongodb://localhost/';
const collection_name = process.env.db_name || 'images';
const db_name = process.env.NODE_ENV === "test" ? `${collection_name}_test` : `${collection_name}`;
const mongoose = require('mongoose');

global.__basedir = __dirname;
mongoose.Promise = global.Promise;

mongoose.connect(db_url + db_name).then(r =>
  console.info(`connected to mongoDB database: "${db_name}"`, `collection: "${collection_name}"`));


module.exports = mongoose;
