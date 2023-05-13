var id = process.argv[2];

return fetch("https://bucket.reportbase5836.workers.dev/gallery/efg")
  .then(function(response)
      {
            if (!response.ok)
                throw new Error('Network error');
            return response.json();
      })
  .then(function(json)
      {
           console.log(json);
      })
  .catch(function(err)
      {
            console.log(err);
      });

