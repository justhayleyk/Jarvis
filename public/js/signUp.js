$(document).ready(function() {
  /* global moment */
  // alert('Hello! I am an alert box!!');

  // formContainer holds all of our posts
  $('form').submit(function(event) {
    console.log($(this).serializeArray());
    event.preventDefault();
  });
});
