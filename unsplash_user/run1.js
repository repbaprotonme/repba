fetch("https://unsplash_user.reportbase5836.workers.dev?search=repba")
.then(resp =>
{
    return resp.json()
})
.then(data =>
{
    console.log(data)
})

