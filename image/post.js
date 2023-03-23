//node post.js post.json
const fs = require('fs');
const args = process.argv;
const CLOUDFLARE_ID = process.env.CLOUDFLARE_ID;
const CLOUDFLARE_IMAGE_TOKEN = process.env.CLOUDFLARE_IMAGE_TOKEN;

async function upload(obj)
{
    try
    {
        const body = new FormData();
        if (obj.id)
            body.append("id", obj.id);
        body.append("url", obj.url);
        body.append("requireSignedURLs", "false");
        body.append("metadata", JSON.stringify(obj));

        const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ID}/images/v1`,
            {
                method: "POST",
                headers:
                {
                    "Authorization": `Bearer ${CLOUDFLARE_IMAGE_TOKEN}`,
                },
                body,
            }
        );

        if (res.status !== 200 && res.status !== 409)
        {
            var str = await res.text()
            throw new Error(`HTTP ${res.status} : ${str}`);
        }

        if (res.status === 409)
        {
            throw new Error(`Already exist: ${imageName}`);
        }

        var k = await res.json();
        return k.result.id;
    }
    catch (e)
    {
        console.log(`ERROR: ${e}`);
    }
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

