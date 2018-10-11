//Will need to change modules name (after db) to Contractor, Customer or Jobs
//
//
var db = require('../models');

module.exports = function(app) {
  // Contractor sign up
  app.post('/api/contractor/SignUp', function(req, res) {
    console.log(req.body);
    db.Contractor.create(req.body)
      .then(function() {
        res.json();
      })
      .catch(function(err) {
        console.log(err);
      });
  });
  // Customer sign up
  app.post('/api/customer/SignUp', function(req, res, next) {
    // console.log(req.body.custUserName);
    // const form = req.body;
    console.log(req.body);
    db.Customer.create(req.body)
      .then(function() {
        res.json();
      })
      .catch(function(err) {
        console.log(err);
      });
  });

  // Contractor Login
  app.get('/api/contractor/Login', function(req, res) {
    db.Contractor.create(req.body).then(function(login) {
      res.json(login);
    });
  });

  // Customer Login
  app.get('/api/customer/Login', function(req, res) {
    db.Customer.create(req.body).then(function(login) {
      res.json(login);
    });
  });

  // Contractor create new post
  app.post('/api/contractorPost', function(req, res) {
    db.Job.create(req.body).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // Customer create new post
  app.post('/api/customerPost', function(req, res) {
    db.Job.create(req.body).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // Customer create new post
  app.get('/api/Jobs', function(req, res) {
    db.Job.findAll({}).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // Delete an example by id
  app.delete('/api/Jobs/:id', function(req, res) {
    db.Job.destroy({ where: { id: req.params.id } }).then(function(dbDelete) {
      res.json(dbDelete);
    });
  });
};
