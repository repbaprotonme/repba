return fetch(`https://bucket.reportbase5836.workers.dev/put1.sh`)
  .then(response => response.text())
  .then(response => console.log(response))
  .catch(err => console.error(err));


