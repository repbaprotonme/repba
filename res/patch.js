//node post.js post.json
const fs = require('fs');
const args = process.argv;

async function patch(obj)
{
    return json.id;
}

async function load(json)
{
    for (var n = 0; n < json.data.length; n++)
    {
        var obj = json.data[n];
        console.log(obj);
        const response = await fetch('https://reportbase.com/image/',
        {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj),
        });

        if (response.ok)
            console.log(await response.json());
    }
}

fs.readFile(args[2], 'utf8', (error, str) =>
{
    var json = JSON.parse(str);
    load(json);
})

