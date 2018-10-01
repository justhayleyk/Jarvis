require('dotenv').config();
var express = require('express');
var app = express();
const { google } = require('googleapis');
var path = require('path');
module.exports = function(app) {
  //will open up static page for login
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../views/calender-login.html'));
  });

  /*const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET_ID,
    process.env.URI
  );

  // generate a url that asks permissions for Google+ and Google Calendar scopes
  const scopes = ['https://www.googleapis.com/auth/calendar.events'];

  const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',

    // If you only need one scope you can pass it as a string
    scope: scopes,
    prompt: 'consent'
  });*/

  app.post('/oauthcallback', function(req, res) {
    /*console.log(res.data.access_token);
    console.log(res.data.scope_token);
    console.log(res.data.token_type);
    console.log(res.data.expires_in);*/
    /*console.log('AccessToken: ' + req.body.access_token);
    console.log('scope: ' + req.body.scope);
    console.log(' tokentype: ' + req.body.token_type);
    console.log('expires in ' + req.body.expires_in);*/
    var accessToken = req.body.access_token;
    var scope = req.body.scope;
    var tokenType = req.body.token_type;
    var expiresIn = req.body.expires_in;
    console.log(
      `this is access token ${accessToken}. This is scope ${scope}. This is token type ${tokenType}. This is expires in ${expiresIn}`
    );
  });
};
