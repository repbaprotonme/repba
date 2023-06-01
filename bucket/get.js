fetch("https://bucket.reportbase5836.workers.dev/put1.sh")
  .then(function(response)
      {
            if (!response.ok)
                throw new Error('Network error');
            return response.text();
      })
  .then(function(text)
      {
           console.log(text);
      })
  .catch(function(err)
      {
            console.log(err);
      });

