require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var path = require('path');

var db = require('./models');

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Use static
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main'
  })
);
app.set('view engine', 'handlebars');

// Routes
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

require('./controllers/vistorController.js')(app);

// If we want to drop tables, force: true
var syncOptions = { force: true };

// If running a test, set syncOptions.force to true
// clearing the `testdb`

//if (process.env.NODE_ENV === 'development') {
//  syncOptions.force = true;
// }

// console.log('env:', process.env.NODE_ENV);
// console.log('options:', syncOptions);

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      '==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.',
      PORT,
      PORT
    );
  });
});

module.exports = app;
