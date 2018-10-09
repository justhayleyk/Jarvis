$(document).ready(function() {
  alert('it works!');

  getServices();

  // Function for creating a new list row for contractors
  function contractorRow(contractorData) {
    var newTr = $('<tr>');
    newTr.data('contractor', contractorData);
    newTr.append('<td>' + contractorData.name + '</td>');
    newTr.append('<td> ' + contractorData.Posts.length + '</td>');
    newTr.append(
      "<td><a href='/blog?contractor_id=" +
        contractorData.id +
        "'>Go to Posts</a></td>"
    );
    newTr.append(
      "<td><a href='/cms?contractor_id=" +
        contractorData.id +
        "'>Create a Post</a></td>"
    );
    newTr.append(
      "<td><a style='cursor:pointer;color:red' class='delete-contractor'>Delete contractor</a></td>"
    );
    return newTr;
  }

  // Function for retrieving contractor and getting them ready to be rendered to the page
  function getServices() {
    $.get('/api/services', function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(contractorRow(data[i]));
      }
      renderList(rowsToAdd);
      nameInput.val('');
    });
  }

  // Adding event listeners to the form to create a new object, and the button to delete
  // an
});
