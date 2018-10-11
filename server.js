require('dotenv').config();
var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
server.listen(4300);
console.log('listening' + server.listen(4300));

var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var path = require('path');

//var cookieSession = require('cookie-session');
var session = require('express-session');

require('dotenv').config();

var db = require('./models');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// var app = express();
var PORT = process.env.PORT || 3000;

// IO dependencies
// var http = require('http').Server(app);
// var io = require('socket.io')(http);

io.on('connection', function(socket) {
  console.log('IO is connected');
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });
});

// http.listen(5000, function() {
//   console.log('Socket is listening on *:' + 5000);
// });

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
  })
);*/
app.use(
  session({
    secret: process.env.COOKIE_KEY,
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

//use for passport session
//app.use(express.session());
app.use(express.static('public'));

// Use static
//app.use(express.static(path.join(__dirname, 'public')));
//initialize passport for middleware

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
require('./routes/calendarRoutes')(app);

// If we want to drop tables, force: true
var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`

//if (process.env.NODE_ENV === 'development') {
// syncOptions.force = true;
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
