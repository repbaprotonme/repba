fetch(`https://dalle.reportbase5836.workers.dev`,
    {
         method: 'PUT',
        headers: { "Content-Type": "application/json", },
       body: JSON.stringify({ 'prompt': 'Lion', 'n': 2, 'size': '1024x1024' })
    })
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
