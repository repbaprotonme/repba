const fs = require('fs');
const args = process.argv;

async function load(json)
{
    for (var n = 0; n < json.data.length; n++)
    {
        var id = json.data[n].id;
        var response = await fetch(`https://reportbase.com/image/${id}`, {method: 'DELETE'});
        console.log(await response.json());
    }
}

fs.readFile(args[2], 'utf8', (error, str) =>
{
    var json = JSON.parse(str);
    load(json);
})

