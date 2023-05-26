const fs = require('fs');
const args = process.argv;

async function load(json)
{
    var out = [];
    for (var n = 0; n < json.data.length; n++)
    {
        var id = json.data[n].id;
        var response = await fetch(`https://reportbase.com/image/${id}`, {method: 'REPORT'});
        var k = await response.json();
        out.push(k);
    }

    console.log(JSON.stringify(out));
}

fs.readFile(args[2], 'utf8', (error, str) =>
{
    var json = JSON.parse(str);
    load(json);
})

