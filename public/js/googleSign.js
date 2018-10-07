$(document).ready(function() {
  //on initial load of the webpage, the signOut button will be hidden
  //$('#logOut').css('display', 'none');
  //setting an empty variable equal to null
  console.log('js file is working');
  var windowOpen;
  /*$.ajax({
    type: 'GET',
    url: '/login/',
    data: loggedin
  }).done(function(response) {
    var loggedin = response.loggedin;
  });*/
  //on click of the login button, a new window(popup) will open to the specified href, with a width and height pre-defined
  //if ((loggedin = true)) {
  //$('.googleAuth').css('display', 'none');
  //} else {
  $('.googleAuth').on('click', function() {
    event.preventDefault();
    //this url was generated from the calenderRoutes.js file url variable
    var googleUrl =
      'https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.events&prompt=consent&response_type=code&client_id=32898389523-n1q62hpuivjjee3i86n876pf96vkn543.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Foauthcallback';
    windowOpen = window.open(
      googleUrl,
      'Sign in with Google',
      'Width=500px, height: 700px'
    );
  });
  //}
  //this function works with the file under public/oauthcallback/callback.html
  //when this window (calender-login page) gets a message it executes
  window.onmessage = function(event) {
    //when a successful oauth code is given back from the google login window
    //this sign in button will be hidden
    $('.googleAuth').css('display', 'none');
    //the sign out button will then be displayed
    //$('#logOut').css('display', 'block');
    //the window created before with the link to the login closes
    windowOpen.close();
    //saving the message received from that closed window into a variable.
    //However the message received is the entire location.href of that window and we only want the oauth code
    var url = event.data;
    //console.log(event);
    //console.log('This is the event :' + url);
    //lastIndexOf of will cut everything before the specified string
    var index = url.lastIndexOf('code=');
    //this will take 5 indexs ahead of the variable index, so we also cut out the
    //consistent portion of "code=" for every users login oauth code.
    var urlIndex = url.substring(index + 5);
    // console.log('with index ' + urlIndex);
    //var code = urlIndex.substring(0, urlIndex.lastIndexOf('&'));
    //although uneccessary, I just set urlIndex=code, and sent the code to calendarRoutes.js
    var code = urlIndex;
    console.log('This is the final code: ' + code);
    //sending the modified code using a post request to the url /token. the data has to be in an object, so
    //just wrap the code in an object and the property code set equal to the variable code.
    $.ajax({
      type: 'POST',
      url: '/token',
      data: { code: code }
    });
  };
  //signOut button js
  //needs work
  /* $('#logOut').on('click', function() {
    console.log('Logout');
    function signOut() {
      //google api method fn
      // var auth2 = gapi.auth2.getAuthInstance();
      //on successful sign out
      //auth2.signOut().then(function() {
      //alert that user has signed out
      alert('Successfully Signed out');
      //change hidden sign in button back to being visible
      $('#login').css('display', 'block');
      //change profile data being shown back to being hidden
      $('#logOut').css('display', 'none');
      //});
    }
    signOut();
  });*/
  //end of document .ready jqeury function
});
