//node delete.js TEMP

return fetch(`https://reportbase.com/image/XASDFASFAF`, {method: 'REPORT'})
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

