const fs = require('fs');
const args = process.argv;
const UNSPLASH_KEY = process.env.UNSPLASH_KEY;
console.log(UNSPLASH_KEY);
var init =
{
  headers:
  {
    'Authorization': `${UNSPLASH_KEY}`
  },
};

fetch(`https://api.unsplash.com/search/photos?query=kiss&client_id=${UNSPLASH_KEY}`)
.then(resp =>
{
    return resp.json()
})
.then(data =>
{
    data = data.results;
    for (var n = 0; n < data.length; ++n)
    {
        var k = data[n];
        console.log(k);
    }
})
