'use strict';

var mongoose = require('mongoose'),
  Image = mongoose.model('Images');
var uploadFile = require("../services/upload");


exports.list_all_images = function(req, res) {
  Image.find({}, function(err, image) {
    if (err)
      res.send(err);
    res.json(image);
    console.debug(`All images successfully retrieved! [quantity: ${image.length}]`);
  });
};


exports.create_image = function(req, res) {
  var new_image = new Image(req.body);
  new_image.save(function(err, image) {
    if (err) {
      console.error(`Image not created! ${err}`);
      res.send(err);
    }
    res.json(image);
    console.debug(`Image successfully created! [id: "${image.get("_id")}", name: "${image.get("name")}", status: "${image.get("status")}"]`);
  });
};


exports.read_image = function(req, res) {
  Image.findById(req.params.imageId, function(err, image) {
    if (err)
      res.send(err);
    res.json(image);
    console.debug(`Image successfully retrieved! [id: "${image.get("_id")}", name: "${image.get("name")}", status: "${image.get("status")}"]`);
  });
};


exports.update_image = function(req, res) {
  Image.findOneAndUpdate({_id:req.params.imageId}, req.body, {new: true}, function(err, image) {
    if (err) {
      console.error(`Image not updated! ${err}`);
      res.send(err);
    }
    res.json(image);
    console.debug(`Image successfully updated! [id: "${image.get("_id")}", name: "${image.get("name")}", status: "${image.get("status")}"]`);
  });
};


exports.delete_image = function(req, res) {

  Image.deleteOne({_id: req.params.imageId}, function(err, image) {
    if (err) {
      console.error(`Image not deleted! ${err}`);
      res.send(err);
    }
    res.json({ message: 'Image successfully deleted' });
    console.debug(`Image successfully deleted! [id: "${image.get("_id")}", name: "${image.get("name")}", status: "${image.get("status")}"]`);
  });
};


exports.convert_image = async function (req, res, next) {
  try {
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({message: "Please upload a file!"});
    }

    //TODO: check if file of same name exists (will be overwritten if so)

    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
    });
  } catch (err) {
    console.log(err);

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  };
};
