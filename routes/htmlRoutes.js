var db = require('../models');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var bcrypt = require('bcrypt-nodejs');
var saltRounds = process.env.SALT;
var salt = bcrypt.genSaltSync(saltRounds);
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
    //var custname=req.body.userName;
    var custpswrd = req.body.userPassword;
    /*console.log(req.body.name);
    console.log(req.body.userPhone);
    console.log(req.body.userAddress);
    console.log(req.body.userEmail);*/
    req.checkBody('name', 'Name cannot be empty. ').notEmpty();
    req.checkBody('userName', 'Username cannot be empty.').notEmpty();
    req
      .checkBody('userName', 'Username has t be between 4 and 15 characters.')
      .len(4, 15);
    req.checkBody('userAddress', 'Address cannot be empty. ').notEmpty();
    req.checkBody('userPhone', 'Cannot be empty. ').notEmpty();
    req.checkBody('userPhone', 'Must be numbers only').isNumeric();
    req.checkBody('userPhone', 'Must be atleast 10 digits').len(10, 15);
    req.checkBody('userEmail', 'Cannot be empty').notEmpty();
    req.checkBody('userEmail', 'Email entered is invalid').isEmail();
    req.checkBody('userPassword', 'Cannot be empty').notEmpty();
    req.checkBody('userEmail', 'between 4 and 60 characters').len(4, 60);
    var errors = req.validationErrors();
    if (errors) {
      console.log(`Errors: ${JSON.stringify(errors)}`);
      res.render('signup', { errors: errors });
    }
    bcrypt.hash(custpswrd, salt, null, function(err, hash) {
      db.Customer.create({
        custname: req.body.name,
        custusername: req.body.userName,
        custaddress: req.body.userAddress,
        custphone: req.body.userPhone,
        custemail: req.body.userEmail,
        custpswrd: custpswrd
      }).then(function(newUser) {
        console.log('hello' + newUser);
      });
    });
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
