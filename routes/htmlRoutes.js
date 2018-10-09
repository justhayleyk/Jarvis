var db = require('../models');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

module.exports = function(app) {
  // Load index page
  app.get('/', function(req, res) {
    res.render('index');

    // db.Example.findAll({}).then(function(dbExamples) {
    //   res.render("index", {
    //     msg: "Welcome!",
    //     examples: dbExamples
    //   });
    // });
  });

  // Load example page and pass in an example by id
  app.get('/login/', function(req, res) {
    res.render('login');

    // db.Example.findOne({ where: { id: req.params.id } }).then(function(
    //   dbExample
    // ) {
    //   res.render('example', {
    //     example: dbExample
    //   });
    // });
  });
  /*app.get('/oauthcallback', function(req, res) {
    res.render('oauthcallback');
    //res.sendFile(path.join(__dirname, '../public/oauthcallback/callback.html'));
  });*/
  // Load example page and pass in an example by id
  app.get('/signup/', function(req, res) {
    res.render('signup');

    // db.Example.findOne({ where: { id: req.params.id } }).then(function(
    //   dbExample
    // ) {
    //   res.render('example', {
    //     example: dbExample
    //   });
    // });
  });
  app.post('/signup/', function(req, res) {
    console.log(req.body.userName);
    console.log(req.body.userPassword);
    console.log(req.body.name);
    console.log(req.body.userPhone);
    console.log(req.body.userAddress);
    console.log(req.body.userEmail);
  });

  // Load example page and pass in an example by id
  app.get('/companysignup/', function(req, res) {
    res.render('companySignup');

    // db.Example.findOne({ where: { id: req.params.id } }).then(function(
    //   dbExample
    // ) {
    //   res.render('example', {
    //     example: dbExample
    //   });
    // });
  });

  // Load example page and pass in an example by id
  app.get('/services/', function(req, res) {
    res.render('services');

    // db.Example.findOne({ where: { id: req.params.id } }).then(function(
    //   dbExample
    // ) {
    //   res.render('example', {
    //     example: dbExample
    //   });
    // });
  });

  // Load example page and pass in an example by id
  app.get('/example/:id', function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render('example', {
        example: dbExample
      });
    });
  });
};
