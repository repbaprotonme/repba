const options =
{
    method: 'DELETE',
    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer majjgSB2awSS1-8WJ7OoRvst4gsGjfLl3Fl0kpdC'}
};

return fetch('https://api.cloudflare.com/client/v4/accounts/41f6f507a22c7eec431dbc5e9670c73d/images/v1/450aab53-d5f7-4f2b-bc55-431d4a2ad600', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));


