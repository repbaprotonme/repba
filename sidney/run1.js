const fs = require('fs');
const args = process.argv;
const PEXEL_KEY = process.env.PEXEL_KEY;
const CLOUDFLARE_IMAGE_TOKEN = process.env.CLOUDFLARE_IMAGE_TOKEN;
const CLOUDFLARE_ID = process.env.CLOUDFLARE_ID;
var per_page = 100;

async function run()
{
    var data = [];

    const init =
    {
      headers:
      {
        'Authorization': `Bearer ${CLOUDFLARE_IMAGE_TOKEN}`,
        'Content-Type': 'application/json',
        'X-Auth-Email': 'reportbase@gmail.com',
      },
    };

    var page = 1;
    var data = [];
    var pages = 6;//seems to be the max
    var start = page*pages;
    var finish = (page+1)*pages;
    for (var n = start; n < finish; ++n)
    {
        var response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ID}/images/v1?per_page=${per_page}&page=${n+1}`, init);
        if (!response.ok)
            break;
        var json = await response.json();
        var images = json.result.images;
        for (var m = 0; m < images.length; ++m)
        {
            var k = images[m];
            var j = {};
            j.id = k.id;
            data.push(j);
        }
    }

    console.log(data);
}

run();


