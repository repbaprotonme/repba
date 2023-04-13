const fs = require('fs');
const args = process.argv;
const search = "Animal";
const page = 1;
const per_page = 100;
const PIXABAY_KEY = process.env.PIXABAY_KEY;
console.log(PIXABAY_KEY);

fetch(`https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${search}&image_type=photo&per_page=${per_page}&page=${page}`)
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
