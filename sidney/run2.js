const fs = require('fs');
const args = process.argv;
const page = 1;
const per_page = 100;

var path = `https://sidney.reportbase5836.workers.dev?page=3`;
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
