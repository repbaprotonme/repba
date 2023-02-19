const form = new FormData();
form.append("metadata", "");
form.append("requireSignedURLs", "");
form.append("url", "[\"test.webp\"]");

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
    'Authorization': 'Bearer hXCWi4iJ8wDztj3LUWqzqXyqjgPCmPypnr5Rjkjb',
    'X-Auth-Email': 'reportbase@gmail.com',
    'X-Auth-Key': 'd27e8f43b04336d419f9b85927dc1e25bb915',
  }
};

options.body = form;

fetch('https://api.cloudflare.com/client/v4/accounts/41f6f507a22c7eec431dbc5e9670c73d/images/v1', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));



