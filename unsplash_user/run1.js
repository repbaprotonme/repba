fetch("https://unsplash.reportbase5836.workers.dev?search=kiss")
.then(resp =>
{
    return resp.json()
})
.then(data =>
{
    console.log(data)
})

