//node get.gallery.js HOME
var id = process.argv[2];

return fetch(`https://bucket.reportbase5836.workers.dev/gallery/${id}`)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));


