const fs = require('fs');
const args = process.argv;

fs.readFile(args[2], 'utf8', (error, str) =>
{
   var lst = str.split("\n")
    var json = {};
    json.hideboss = 1;
    json.data = []
    for (var n = 0; n < lst.length; ++n)
    {
        var k = {};
        var name = lst[n];
        if (!name)
            continue;
        k.url = `http://207.246.108.73/data/starwars/legacy/${name}`;
        var j = `starwars/legacy/${name}`;
        j = j.split("/");
        j.pop();
        k.folder = j.join("/")
        name = name.split("/")[0];
        k.title = `Chapter ${name}`;
        k.width = 1200
        k.height = 1865
        json.data.push(k);
    }

    console.log(JSON.stringify(json));
})



