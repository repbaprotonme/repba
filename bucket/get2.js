return fetch(`https://bucket.reportbase5836.workers.dev/put1.sh`)
  .then(function(response)
      {
        console.log(response.headers.get('Content-Type'));

        for (let [key, value] of response.headers)
        {
            console.log(`${key} = ${value}`);
        }
      });


