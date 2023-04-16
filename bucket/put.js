//node put.js "ABC"
var id = process.argv[2];

const options =
{
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'Fetch PUT Request Example' })
};
fetch(`https://bucket.reportbase5836.workers.dev/gallery/${id}`, options)
    .then(response => console.log(response))


