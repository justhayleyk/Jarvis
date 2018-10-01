//on sign in into google
function onSignIn(googleUser) {
  //this will get basic details of the person signing in
  var profile = googleUser.getBasicProfile();
  //once user is signed in, the sign in button will be hidden
  $('.g-signin2').css('display', 'none');
  //changing the intial properties of the user data from none to block
  $('.data').css('display', 'block');
  //using pic id specified, we get the profile pic using its image url
  $('#pic').attr('src', profile.getImageUrl());
  //email address will be displayed in email div
  $('#email').text(profile.getEmail());
  //this will request google for a token
  //var id_token = googleUser.getAuthResponse().id_token;

  //console.log('This is id token: ' + id_token);
  var DISCOVERY_DOCS = [
    'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
  ];
  var auth2 = gapi.auth2.getAuthInstance();
  var options = new gapi.auth2.SigninOptionsBuilder({
    scope: 'https://www.googleapis.com/auth/calendar',
    discoveryDocs: DISCOVERY_DOCS
  });
  googleUser = auth2.currentUser.get();
  googleUser.grant(options).then(
    function(success) {
      var accesstoken = success.Zi.access_token;
      //var scopetoken = success.Zi.scope;
      var tokentype = success.Zi.token_type;
      var expiresin = success.Zi.expires_in;
      //console.log(accesstoken, scopetoken, tokentype, expiresin);
      var sendingData = {
        access_token: accesstoken,
        scope:
          'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events',
        token_type: tokentype,
        expires_in: expiresin
      };
      console.log(sendingData);
      $.ajax({
        type: 'POST',
        url: '/oauthcallback',
        data: sendingData
      });
      console.log(JSON.stringify({ message: 'success', value: success }));
    },
    function(fail) {
      alert(JSON.stringify({ message: 'fail', value: fail }));
    }
  );
  //const calendar = google.calendar({ version: 'v3', auth });
  var event = {
    summary: 'Google I/O 2015',
    location: '800 Howard St., San Francisco, CA 94103',
    description: "A chance to hear more about Google's developer products.",
    start: {
      dateTime: '2018-10-01T09:00:00-07:00',
      timeZone: 'America/Los_Angeles'
    },
    end: {
      dateTime: '2018-10-01T17:00:00-07:00',
      timeZone: 'America/Los_Angeles'
    },
    recurrence: ['RRULE:FREQ=DAILY;COUNT=2'],
    attendees: [{ email: 'lpage@example.com' }, { email: 'sbrin@example.com' }],
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 10 }
      ]
    }
  };

  var request = gapi.client.calendar.events.insert({
    calendarId: 'primary',
    resource: event
  });

  request.execute(function(event) {
    appendPre('Event created: ' + event.htmlLink);
  });
  //console.log(calenderList.list());
}
function signOut() {
  //google api method fn
  var auth2 = gapi.auth2.getAuthInstance();
  //on successful sign out
  auth2.signOut().then(function() {
    //alert that user has signed out
    alert('Successfully Signed out');
    //change hidden sign in button back to being visible
    $('.g-signin2').css('display', 'block');
    //change profile data being shown back to being hidden
    $('.data').css('display', 'none');
  });
}
