var mystring = "Hello World!";
var blob = new Blob([mystring], { type: 'text/plain' });

fetch(`https://bucket.reportbase5836.workers.dev/blob`,
{
  method: 'POST',
  body: blob
})
  .then(response => response.text())
  .then(response => console.log(response))
  .catch(err => console.error(err));




