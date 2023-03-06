//node delete.js TEMP

const options =
{
    method: 'REPORT',
};

return fetch(`https://reportbase.com/image/XASDFASFAF`, options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

