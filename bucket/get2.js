//node get.gallery.js HOME
var id = process.argv[2];

return fetch(`https://bucket.reportbase5836.workers.dev/gallery/${id}`)
  .then(function(response)
      {
        console.log(response.headers.get('Content-Type'));

        for (let [key, value] of response.headers)
        {
            console.log(`${key} = ${value}`);
        }
      });


