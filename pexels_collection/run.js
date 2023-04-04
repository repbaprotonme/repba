const fs = require('fs');
const args = process.argv;
const PEXEL_KEY = process.env.PEXEL_KEY;
console.log(PEXEL_KEY);
var init =
{
  headers:
  {
    'Authorization': PEXEL_KEY
  },
};

fetch(`https://api.pexels.com/v1/collections/u8udhbp`, init)
.then(resp =>
{
    return resp.json()
})
.then(data =>
{
    console.log(data);
    for (var n = 0; n < data.length; ++n)
    {
        var k = data[n];
        console.log(k);
    }
})
