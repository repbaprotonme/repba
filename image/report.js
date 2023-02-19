//node delete.js TEMP

const options =
{
    method: 'DELETE',
    headers:
    {
        'Content-Type': 'application/json'
    }
};

return fetch(`https://reportbase.com/image/cdabbdf5-8c6e-4745-b418-a5adc4bd5400`, options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

