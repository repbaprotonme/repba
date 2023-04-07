fetch("https://unsplash_photo.reportbase5836.workers.dev?id=zwNr_YqAXM0")
.then(resp =>
{
    return resp.json()
})
.then(data =>
{
    console.log(data)
})

