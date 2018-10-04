//requiring in dotenv to store in google client Id, client secret id and uri redirect
require('dotenv').config();
//require in express to build local server
var express = require('express');
//rerouting pages
var app = express();
//requiring in path to use static pages, although login can be incorporated into the homepage using handlebars too
var path = require('path');
//apart of google oauth startup. fs is needed if credentials were to be saved in a .txt or .json file
const fs = require('fs');
const readline = require('readline');
//importing the googleapis
const { google } = require('googleapis');
//exporting everything for use in server file
module.exports = function(app) {
  var OAuth2 = google.auth.OAuth2;
  //the auth2client is us
  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET_ID,
    process.env.URI
  );
  // generate a url that asks permissions for Google calender view only and Google Calendar modifying events.
  //You can add to scopes here if you need any other apis
  const scopes = [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.events'
  ];
  //this will generate a url that the user must login into and allow permission for use
  const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent'
  });
  //login page under /login, the static page for calender login is located here
  /*app.get('/google', function(req, res) {
    res.render('contractorUI');
  });*/
  // Render 404 page for any unmatched routes
  /*app.get('*', function(req, res) {
    res.render('404');
  });*/
  //when the user agrees and allows permission this page will close, but route is needed to generate the oauth code
  //and send it back to the login page where it will be modified and sent back to the calenderRoutes.js to get
  //access tokens, token type, expiration, refresh token, etc.
  app.get('/oauthcallback', function(req, res) {
    //res.render('oauthcallback');

    res.sendFile(path.join(__dirname, '../public/oauthcallback/callback.html'));
  });
  //the login page will send the oauth code on this
  app.post('/token', function(req, res) {
    // This will provide an object with the access_token and refresh_token.
    var code = req.body.code;
    //console.log(code);
    //this fn will get the tokens required(access tokens, refresh tokens, token type, expiration)
    oauth2Client.getToken(code, function(err, tokens) {
      if (err) {
        console.log(err);
      }
      //console.log(tokens);
      //set the credentials of the user based on the tokens generated using the oauth code
      oauth2Client.setCredentials(tokens);
      //this is uneccessary, just to make sure that the addevents() test fn doesnt execute
      //till the user has the credentials based on the tokens. I had some issues with
      //async functions. This will just wait 4 seconds until it executes.
      setTimeout(function() {
        addEvents();
      }, 4000);
    });
    //every refresh token usually has about 3600 milliseconds of lifespan. This function will automatically
    //renew the refresh token if it expires.
    oauth2Client.on('tokens', tokens => {
      if (tokens.refresh_token) {
        // still need to store this new refresh token somewhere in the database
        console.log(tokens.refresh_token);
      }
      //console.log(tokens.access_token);
    });
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
            { method: 'email', minutes: 24 * 60 },
            { method: 'popup', minutes: 10 }
          ]
        }
      };
      //specifies that the calender is version 3
      var calendar = google.calendar('v3');
      //insert event into calender where authorization is set by the oauth2client(us) and the calender
      //belong to the primary user whose tokens are present(user).
      calendar.events.insert(
        { auth: oauth2Client, calendarId: 'primary', resource: event }, //if there is an error, the console log will show what error there is
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
          console.log('Event created: %s', event.htmlLink);
        }
      );
    }
  });
};
