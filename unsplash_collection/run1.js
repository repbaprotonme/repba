const ID = "KGC5CLhoyV8"
fetch(`https://unsplash_collection.reportbase5836.workers.dev?search=${ID}`)
.then(resp =>
{
    return resp.json()
})
.then(data =>
{
    console.log(data)
})

