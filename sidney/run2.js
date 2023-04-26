var path = `https://sidney.reportbase5836.workers.dev`;
fetch(path)
.then(resp =>
{
    if (resp.ok)
        return resp.json()
    else
        throw Error(resp.statusText);
})
.then(data =>
{
    console.log(data);
})
.catch((error) =>
{
    console.log(error);
});
