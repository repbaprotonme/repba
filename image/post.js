const fs = require('fs');

async function upload()
{
    const body = new FormData();
    body.append("url", "https://i.imgur.com/lEWdncT.jpg");
    body.append("requireSignedURLs", "");

    var metadata = {};
    metadata.email = "a@b.com";
    metadata.party = "123";
    body.append("metadata", JSON.stringify(metadata));

    try
    {
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
            throw new Error("HTTP " + res.status + " : " + await res.text());
        if (res.status === 409)
            console.log("Already exist: " + imageName);
    }
    catch (e)
    {
        console.log("ERROR:" + e);
    }
}

async function load()
{
    for (var n = 0; n < 5; n++)
    {
        await upload()
    }
}

fs.readFile('./post.json', 'utf8', (error, data) =>

{
     console.log(JSON.parse(data));
})

