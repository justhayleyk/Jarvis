require('dotenv').config();
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

// Middleware

const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
module.exports = function(app) {
  var OAuth2 = google.auth.OAuth2;
  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET_ID,
    process.env.URI
  );

  // generate a url that asks permissions for Google+ and Google Calendar scopes
  const scopes = [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.events'
  ];

  const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',

    // If you only need one scope you can pass it as a string
    scope: scopes,
    prompt: 'consent'
  });
  console.log(url);
  app.get('/login', function(req, res) {
    res.sendFile(
      path.join(__dirname, '../public/loginpage/calender-login.html')
    );
  });
  app.get('/oauthcallback', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/oauthcallback/callback.html'));
  });
  app.post('/token', function(req, res) {
    // This will provide an object with the access_token and refresh_token.
    // Save these somewhere safe so they can be used at a later time.
    var code = req.body.code;
    console.log(code);
    oauth2Client.getToken(code, function(err, tokens) {
      if (err) {
        console.log(err);
      }
      console.log(tokens);
      oauth2Client.setCredentials(tokens);
      setTimeout(function() {
        addEvents();
      }, 4000);
    });
    oauth2Client.on('tokens', tokens => {
      if (tokens.refresh_token) {
        // store the refresh_token in my database!
        console.log(tokens.refresh_token);
      }
      console.log(tokens.access_token);
      console.log('Now lets see');
    });
    //
    function addEvents(auth) {
      var event = {
        summary: 'test',
        location: '800 Howard St., San Francisco, CA 94103',
        description: "A chance to hear more about Google's developer products.",
        start: {
          dateTime: '2018-10-09T09:00:00-07:00',
          timeZone: 'America/Los_Angeles'
        },
        end: {
          dateTime: '2018-10-09T17:00:00-07:00',
          timeZone: 'America/Los_Angeles'
        },
        recurrence: ['RRULE:FREQ=DAILY;COUNT=2'],
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 },
            { method: 'popup', minutes: 10 }
          ]
        }
      };

      //console.log(event)

      var calendar = google.calendar('v3');

      calendar.events.insert(
        {
          auth: oauth2Client,
          calendarId: 'primary',
          resource: event
        },
        function(err, event) {
          if (err) {
            console.log(
              'There was an error contacting the Calendar service: ' + err
            );
            return;
          }
          console.log('Event created: %s', event.htmlLink);
        }
      );
    }
  });
};
