//node get.js HOME
var id = process.argv[2];

return fetch("https://bucket.reportbase5836.workers.dev/gallery/" + id)
  .then(response => response.json())
  .then(function(json)
      {
           console.log(JSON.stringify(json));
      })


