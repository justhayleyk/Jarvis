require('dotenv').config();
var express = require('express');
var app = express();
const { google } = require('googleapis');
var path = require('path');
module.exports = function(app) {
  //will open up static page for login
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../views/calender-login.html'));

    const oauth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET_ID,
      process.env.URI
    );

    // generate a url that asks permissions for Google+ and Google Calendar scopes
    const scopes = ['https://www.googleapis.com/auth/calendar'];

    const url = oauth2Client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: 'offline',

      // If you only need one scope you can pass it as a string
      scope: scopes,
      prompt: 'consent'
    });
    app.get('/url', function(req, res) {
      res.send(url);
    });
  });
};
