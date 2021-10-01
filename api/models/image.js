'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  name: {
    type: String,
    Required: 'Enter the full image name (including file extension)'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'ongoing', 'completed']
    }],
    default: ['pending']
  }
});


module.exports = mongoose.model('Images', TaskSchema);
