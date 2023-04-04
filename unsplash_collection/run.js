const fs = require('fs');
const args = process.argv;
const ID = "KGC5CLhoyV8"
const UNSPLASH_KEY = process.env.UNSPLASH_KEY;
console.log(UNSPLASH_KEY);

fetch(`https://api.unsplash.com/collections/${ID}/photos?client_id=${UNSPLASH_KEY}`)
.then(resp =>
{
    return resp.json()
})
.then(data =>
{
    console.log(data)
})
