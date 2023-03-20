//node post1.jsh TRAP 66

const fs = require('fs');

async function upload(obj)
{
    try
    {
        const body = new FormData();
        body.append("id", obj.id);
        body.append("url", obj.url);
        body.append("requireSignedURLs", "false");
        body.append("metadata", JSON.stringify(obj));

        const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/41f6f507a22c7eec431dbc5e9670c73d/images/v1`,
            {
                method: "POST",
                headers:
                {
                    "Authorization": `Bearer hXCWi4iJ8wDztj3LUWqzqXyqjgPCmPypnr5Rjkjb`,
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

        await res.json();
    }
    catch (e)
    {
        console.log(`ERROR: ${e}`);
    }
}

Number.prototype.pad = function(size)
{
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
	    return s;
}

async function load()
{
    var json = {};
    json.data = [];
    for (var n = 0; n <= Number(process.argv[3]); n++)
    {
        var j = {}
        var k = n.pad(4);
        j.id = `${process.argv[2]}.${k}`;
        j.url = `http://reportbase.me/data/${j.id}.webp`;
        json.data.push(j);
        await upload(j)
    }

    console.log(json);
}


load();
