const fs = require('fs');
const args = process.argv;
const UNSPLASH_KEY = process.env.UNSPLASH_KEY;
const PHOTO_ID = "zwNr_YqAXM0";
console.log(UNSPLASH_KEY);

fetch(`https://api.unsplash.com/photos/${PHOTO_ID}?client_id=${UNSPLASH_KEY}`)
.then(resp =>
{
    return resp.json()
})
.then(data =>
{
    console.log(data);
})
