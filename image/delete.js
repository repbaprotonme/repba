//node delete.js TEMP

const options =
{
    method: 'DELETE',
    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer hXCWi4iJ8wDztj3LUWqzqXyqjgPCmPypnr5Rjkjb'}
};

var id = "$1";
return fetch(`https://api.cloudflare.com/client/v4/accounts/41f6f507a22c7eec431dbc5e9670c73d/images/v1/${id}`, options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));


