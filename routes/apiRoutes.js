//Will need to change modules name (after db) to Contractor, Customer or User
//
//
var db = require('../models/contractors.js');

module.exports = function(app) {
  // Get all examples
  app.get('/api/services', function(req, res) {
    db.Contractor.findAll({}).then(function(contrInfo) {
      console.log('find all contractors');
      console.log('contrInfo');
      res.render('services', { contractor: contrInfo });
    });
  });
};
