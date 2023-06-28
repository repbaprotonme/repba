const fs = require('fs');
const args = process.argv;

fs.readFile(args[2], 'utf8', (error, str) =>
{
   var lst = str.split("\n")
    var json = {};
    json.data = []
    for (var n = 0; n < lst.length; ++n)
    {
        var k = {};
        var name = lst[n];
        if (!name)
            continue;
        k.url = `http://reportbase.me/data/${name}`;
        json.data.push(k);
    }

    console.log(JSON.stringify(json));
})



