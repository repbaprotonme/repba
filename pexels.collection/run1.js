fetch("https://pexels_collection.reportbase5836.workers.dev?search=hdtefpy")
.then(resp =>
{
    return resp.json()
})
.then(data =>
{
    console.log(data)
})

