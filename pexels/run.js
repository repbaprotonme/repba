const fs = require('fs');
const args = process.argv;
const PEXEL_KEY = process.env.PEXEL_KEY;
const search = "kiss";
const per_page = 30;
const page = 1;
console.log(PEXEL_KEY);
var init =
{
  headers:
  {
    'Authorization': `${PEXEL_KEY}`
  },
};

fetch(`https://api.pexels.com/v1/search?query=${search}&per_page=${per_page}&page=${page}`, init)
.then(resp =>
{
    return resp.json()
})
.then(data =>
{
    console.log(data);
    /*
    for (var n = 0; n < data.length; ++n)
    {
        var k = data[n];
        console.log(k);
    }
    */
})
