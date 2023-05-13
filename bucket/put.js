//node put.js "ABC"
var id = process.argv[2];
const options =
{
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({a:1})
};
fetch(`https://bucket.reportbase5836.workers.dev/gallery/efg`, options)
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





