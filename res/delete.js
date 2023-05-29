const fs = require('fs');
const args = process.argv;

async function load(json)
{
    for (var n = 0; n < json.data.length; n++)
    {
        var id = json.data[n].id;
        var response = await fetch(`https://reportbase.com/image/${id}`, {method: 'DELETE'});
        if (!response.ok)
        {
            console.log(`Failed: ${id}`);
        }
        else
        {
            var json = await response.json();
            json.id = id;
            console.log(json);
        }
    }
}

fs.readFile(args[2], 'utf8', (error, str) =>
{
    var json = JSON.parse(str);
    load(json);
})

