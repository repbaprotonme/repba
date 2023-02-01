//node get.js HOME
var id = process.argv[2];

return fetch("https://reportbase.com/gallery/" + id)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));


