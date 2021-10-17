'use strict';

module.exports = function(app) {
  var controller = require('../controllers/imageController');

  // Routes
  app.route('/images')
    .get(controller.list_all_images)
    .post(controller.create_image);

  app.route('/images/:imageId')
    .get(controller.read_image)
    .put(controller.update_image)
    .delete(controller.delete_image);

  app.route('/image-conversion')
    .post(controller.convert_image);
};
