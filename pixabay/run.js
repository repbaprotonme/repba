const fs = require('fs');
const args = process.argv;
const search = "kiss";
const PIXABAY_KEY = process.env.PIXABAY_KEY;
console.log(PIXABAY_KEY);

fetch(`https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${search}&image_type=photo`)
.then(resp =>
{
    return resp.json()
})
.then(data =>
{
    console.log(data);
})
