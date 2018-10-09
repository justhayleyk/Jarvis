var db = require('../models');

module.exports = function(app) {
  // Load example page and pass in an example by id
  app.get('/services', function(req, res) {
    res.render('services');
  });

  // Render 404 page for any unmatched routes
  app.get('*', function(req, res) {
    res.render('404');
  });
};
