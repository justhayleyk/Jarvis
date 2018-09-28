//requiring in models folder
var db = require('../models');
//require in npm file express
var express = require('express');
var app = express();
//export function to the apiRoutes
module.exports = function(app) {
  //redirect every page hit to "/"
  app.get('/', function(req, res) {
    res.redirect('/');
  });
  //vistor being able to see all post within a certain category
  app.get('/', function(req, res) {
    db.Contractor.findAll({
      where: {
        category: req.body.category
      }
    })
      .then(function(dbFindAllCategory) {
        var Obj = { businesses: dbFindAllCategory };
        console.log(Obj);
        res.json(Obj);
        //res.render('index', Obj);
      })
      .catch(function(err) {
        if (err) throw err;
      });
  });
};
