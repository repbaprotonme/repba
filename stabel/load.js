const fs = require('fs');
const args = process.argv;

fs.readFile(args[2], 'utf8', (error, str) =>
{
    var json = JSON.parse(str);
    var output = json.output
    var j = {};
    j.data = [];
    for (var n = 0; n < output.length; ++n)
    {
        var k = {};
        k.full = output[n];
        j.data.push(k);
    }

    console.log(JSON.stringify(j));
})

