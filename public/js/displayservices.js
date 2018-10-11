$(document).ready(function() {
  console.log('displservice.js');

  function rotateCard(btn) {
    var $card = $(btn).closest('.card-container');
    console.log($card);
    if ($card.hasClass('hover')) {
      $card.removeClass('hover');
    } else {
      $card.addClass('hover');
    }
  }

  // selImage(contrcategory);
  // function selImage(category) {

  // if (category === 'cleaner') {
  //   var imageSrc = $('<img src=');

  //   <img src="/images/female-cleaner.jpg" />}
  //   if ({{this.contrcategory}} === 'laundry') {
  //   <img src="/images/doing-the-laundry.jpg" />}
  //  if ({{this.contrcategory}} === 'chef') {
  //   <img src="/images/male-chef.jpg" />}
  // getcontractors();
  // Function for retrieving contractors and getting them ready to be rendered to the page
  // function getcontractors() {
  //   $.get('/api/services', function(contractor) {
  //    console.log('data = ', contractor);

  //      var rowsToAdd = [];
  //      for (var i = 0; i < data.length; i++) {
  //        rowsToAdd.push(dispService(data[i]));
  //      }
  //      renderContrList(rowsToAdd);
  //   });
  // }
});
