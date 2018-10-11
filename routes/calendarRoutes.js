//requiring in dotenv to store in google client Id, client secret id and uri redirect
require('dotenv').config();
var db = require('../models');
//require in express to build local server
var express = require('express');
//rerouting pages
var app = express();
//requiring in path to use static pages, although login can be incorporated into the homepage using handlebars too
var path = require('path');
//session npm library
var Session = require('express-session');
//apart of google oauth startup. fs is needed if credentials were to be saved in a .txt or .json file
const fs = require('fs');
const readline = require('readline');
//importing the googleapis
const { google } = require('googleapis');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//exporting everything for use in server file
module.exports = function(app) {
  //session storage. Secret is randomly created. resave forces session to be stored in session storage. setting saveUninitialized to true
  //forces session to be stored in the store. Set to false if you need permissions to allow cookies, reducing server storage usuage
  //or for implementing a required login page
  passport.serializeUser(function(Customer, done) {
    done(null, Customer.google_Id);
  });
  passport.deserializeUser(function(google_Id, done) {
    db.Customer.Find({ google_Id: google_Id }).then(function(Customer) {
      done(null, Customer);
    });
  });

  //
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET_ID,
        callbackURL: process.env.URI
      },
      function(accessToken, refreshToken, profile, done) {
        //console.log(profile.id);
        db.Customer.findOne({ where: { google_Id: profile.id } }).then(function(
          existingUser
        ) {
          if (existingUser) {
            //already have user
            console.log('Already have this user: ' + existingUser);
            done(null, existingUser);
          } else {
            //if not in database create
            db.Customer.create({
              google_Id: profile.id,
              name: profile.displayName
              //name: profile.displayName
            }).then(function(newUser) {
              console.log('new user created: ' + newUser);
              done(null, newUser);
              //res.redirect('/');
            });
          }
        });
      }
    )
  );
  //

  // generate a url that asks permissions for Google calender view only and Google Calendar modifying events.
  //You can add to scopes here if you need any other apis

  //this will generate a url that the user must login into and allow permission for use

  //custom middleware function. basically gets the necessary code and gets code and saves into session storage

  /*app.use(function(req, res, next) {
    authenticate();
  });*/
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
  app.get(
    '/loginGoogle',
    passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/calendar.events',
        'https://www.googleapis.com/auth/plus.login'
      ]
    })
  );
  //when the user agrees and allows permission this page will close, but route is needed to generate the oauth code
  //and send it back to the login page where it will be modified and sent back to the calenderRoutes.js to get
  //access tokens, token type, expiration, refresh token, etc.
  app.get(
    '/oauthcallback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      //res.render('oauthcallback');

      res.redirect('/');
    }
  );
  //var loggedin = false;
  //the login page will send the oauth code on this
  /*app.post('/token', function(req, res) {
    //this will implement a session for storage
    var session = req.session;
    //async functions. This will just wait 4 seconds until it executes. Unecesary, but makes sure fn
    //won't execute till credentials are set, just a precautionary step.
    setTimeout(function() {
      addEvents();
      console.log('sucess');
    }, 4000);
    //every refresh token usually has about 3600 milliseconds of lifespan. This function will automatically
    //renew the refresh token if it expires.
    //this is just a test function to add an event. It does work. Since credential are present by now,
    //have the user specify what summary they want for an event, its description, start and end times (need these 3 at minimum).
    function addEvents(auth) {
      var event = {
        summary: 'test',
        location: '800 Howard St., San Francisco, CA 94103',
        description: "A chance to hear more about Google's developer products.",
        start: {
          dateTime: '2018-10-08T09:00:00-07:00',
          timeZone: 'America/Los_Angeles'
        },
        end: {
          dateTime: '2018-10-08T17:00:00-07:00',
          timeZone: 'America/Los_Angeles'
        },
        recurrence: ['RRULE:FREQ=DAILY;COUNT=2'],
        reminders: {
          useDefault: false,
          overrides: [
            {
              method: 'email',
              minutes: 24 * 60
            },
            {
              method: 'popup',
              minutes: 10
            }
          ]
        }
      };
      //specifies that the calender is version 3
      var calendar = google.calendar('v3');
      //insert event into calender where authorization is set by the oauth2client(us) and the calender
      //belong to the primary user whose tokens are present(user).
      calendar.events.insert(
        {
          auth: oauth2Client,
          calendarId: 'primary',
          resource: event
        }, //if there is an error, the console log will show what error there is
        //usually there will be a maximum usuage error, if so create new credentials at
        //https://console.developers.google.com/ and make the credentials for the oauth login
        //set the uri to http://localhost:3000 and the callback to http://localhost:3000/oauthcallback.
        //when pushing to production you will need new credentials for it.
        function(err, event) {
          if (err) {
            console.log(
              'There was an error contacting the Calendar service: ' + err
            );
            return;
          }
          console.log(`Event created: ${event.summary} `, event.htmlLink);
        }
      );
    }
  });*/
};
