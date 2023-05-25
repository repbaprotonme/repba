const options =
{
    method: 'DELETE',
};
fetch(`https://bucket.reportbase5836.workers.dev/gallery/efg`, options)
  .then(response => response.text())
  .then(function(text)
      {
            console.log(text);
      })
  .catch(function(err)
      {
            console.log(err);
      });





