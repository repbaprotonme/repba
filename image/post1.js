//node post.js post.json
const fs = require('fs');
const args = process.argv;
const CLOUDFLARE_ID = process.env.CLOUDFLARE_ID;
const CLOUDFLARE_IMAGE_TOKEN = process.env.CLOUDFLARE_IMAGE_TOKEN;

async function upload(obj)
{
    const res = await fetch('https://reportbase.com/image/',
    {
      method: 'POST',
      headers:
      {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify(obj),
    });

    const json = await res.json()
    return json.id;
}

async function load(json)
{
    for (var n = 0; n < json.data.length; n++)
    {
        var id = await upload(json.data[n])
        json.data[n].id = id;
    }

    console.log(json);
}

fs.readFile(args[2], 'utf8', (error, str) =>
{
    var json = JSON.parse(str);
    load(json);
})

