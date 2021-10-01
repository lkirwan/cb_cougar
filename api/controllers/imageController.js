'use strict';

var mongoose = require('mongoose'),
  Image = mongoose.model('Images');



exports.list_all_images = function(req, res) {
  Image.find({}, function(err, image) {
    if (err)
      res.send(err);
    res.json(image);
  });
};


exports.create_image = function(req, res) {
  var new_image = new Image(req.body);
  new_image.save(function(err, image) {
    if (err)
      res.send(err);
    res.json(image);
  });
};

exports.read_image = function(req, res) {
  Image.findById(req.params.imageId, function(err, image) {
    if (err)
      res.send(err);
    res.json(image);
  });
};

exports.update_image = function(req, res) {
  Image.findOneAndUpdate({_id:req.params.imageId}, req.body, {new: true}, function(err, image) {
    if (err)
      res.send(err);
    res.json(image);
  });
};
// Image.remove({}).exec(function(){});
exports.delete_image = function(req, res) {

  Image.remove({
    _id: req.params.imageId
  }, function(err, image) {
    if (err)
      res.send(err);
    res.json({ message: 'Image successfully deleted' });
  });
};
