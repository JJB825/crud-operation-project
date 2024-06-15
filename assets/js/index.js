$('#add_user').submit(function (event) {
  alert('Data inserted successfully');
});

$('#update_user').submit(function (event) {
  // the usual activity after clicking the submit button is to clear the form fields and reload the page. But here we want to change that.
  event.preventDefault();

  // this gonna give the data from the form
  const unindexed_array = $(this).serializeArray();
  const updated_data = {};

  $.map(unindexed_array, function (n, i) {
    updated_data[n['name']] = n['value'];
  });

  const request = {
    url: `http://localhost:3000/api/users/${updated_data.id}`,
    method: 'PUT',
    data: updated_data,
  };

  $.ajax(request).done(function (response) {
    alert('Data updated successfully');
  });
});

if (window.location.pathname == '/') {
  $ondelete = $('.table tbody td a.delete');
  $ondelete.click(function () {
    const id = $(this).attr('user_id');

    const request = {
      url: `http://localhost:3000/api/users/${id}`,
      method: 'DELETE',
    };

    if (confirm('Do you really want to delete this record?')) {
      $.ajax(request).done(function (response) {
        alert('Data deleted successfully');
        location.reload();
      });
    }
  });
}
