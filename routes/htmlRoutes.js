var db = require('../models');

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
  app.get('/signUp', function(req, res) {
    res.render('signup');
  });

  // app.post('/customerSignUp', function(req, res) {
  // console.log(req.body.username);
  // db.Example.findOne({ where: { id: req.params.id } }).then(function(
  //   dbExample
  // ) {
  //   res.render('example', {
  //     example: dbExample
  //   });
  // });
  // });

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

  // socketIO chat route
  app.get('/chat/', function(req, res) {
    res.sendFile(__dirname + '/socketio.html');
    console.log('this is dirname' + __dirname);
  });

  // Load example page and pass in an example by id
  //app.get('/services/', function(req, res) {
  //   db.Contractor.findAll({}).then(function(contractInfo) {
  //   res.render('services', { contractor: contractInfo});
  //   });
  // });

  app.get('/services/cleaner', function(req, res) {
    db.Contractor.findAll({ where: { contrcategory: 'cleaner' } }).then(
      function(contractInfo) {
        console.log('htmlroute catego =cleaner');
        res.render('services', { contractor: contractInfo });
      }
    );
  });

  app.get('/services/chef', function(req, res) {
    db.Contractor.findAll({
      where: { contrcategory: 'chef' }
    }).then(function(contractInfo) {
      console.log('category = chef');
      res.render('services', { contractor: contractInfo });
    });
  });

  app.get('/services/laundry', function(req, res) {
    db.Contractor.findAll({
      where: { contrcategory: 'laundry' }
    }).then(function(contractInfo) {
      console.log('category = laundry');
      res.render('services', { contractor: contractInfo });
    });
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
