fetch("https://pexels_collection.reportbase5836.workers.dev?search=xxxxxx")
.then(resp =>
{
    if (!resp.ok)
        throw new Error('!!!!!');
    return resp.json()
})
.then(data =>
{
    console.log(data)
})
.catch(error =>
{
  console.error('Error:', error);
});

