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
