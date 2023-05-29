//node post.js post.json
const fs = require('fs');
const args = process.argv;

fs.readFile(args[2], 'utf8', (error, str) =>
{
    var lines = str.split("\n");
    var json = {};
    json.data = [];
    for (var n = 0; n < lines.length; n++)
    {
        var line = lines[n].trim();
        if (!line)
            continue;
        var k = {}
        k.url = `http://reportbase.me/data/${line}`;
        json.data.push(k);
    }

    console.log(JSON.stringify(json));
})

