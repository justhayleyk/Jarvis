$(document).ready(function() {
  var windowOpen;
  $('#login').on('click', function() {
    var googleUrl =
      'https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.events&prompt=consent&response_type=code&client_id=32898389523-n1q62hpuivjjee3i86n876pf96vkn543.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Foauthcallback';
    windowOpen = window.open(
      googleUrl,
      'Sign in with Google',
      'Width=500px, height: 700px'
    );
  });
  window.onmessage = function(event) {
    windowOpen.close();
    var url = event.data;
    console.log(event);
    console.log('This is the event :' + url);
    var index = url.lastIndexOf('code=');
    var urlIndex = url.substring(index + 5);
    // console.log('with index ' + urlIndex);
    //var code = urlIndex.substring(0, urlIndex.lastIndexOf('&'));
    var code = urlIndex;
    console.log('This is the final code: ' + code);
    $.ajax({
      type: 'POST',
      url: '/token',
      data: { code: code }
    });
  };
});
