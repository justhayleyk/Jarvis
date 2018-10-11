//Will need to change modules name (after db) to Contractor, Customer or User
//
//
var db = require('../models');

module.exports = function(app) {
  // Get all examples
  app.get('/api/services/cleaner', function(req, res) {
    db.Contractor.findAll({ where: { contrcategory: 'cleaner' } }).then(
      function(contractInfo) {
        console.log('apiroutes cleaner');
        res.json(contractInfo);
      }
    );
  });

  app.get('/api/services/chef', function(req, res) {
    db.Contractor.findAll({ where: { contrcategory: 'chef' } }).then(function(
      contractInfo
    ) {
      console.log('apiroutes chef');
      res.json(contractInfo);
    });
  });

  app.get('/api/services/laundry', function(req, res) {
    db.Contractor.findAll({ where: { contrcategory: 'laundry' } }).then(
      function(contractInfo) {
        console.log('apiroutes laundry');
        res.json(contractInfo);
      }
    );
  });

  // Create a new example
  app.post('/api/examples', function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete('/api/examples/:id', function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
