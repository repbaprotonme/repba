const fs = require('fs');
fs.readFile(process.argv[2], 'utf8', (error, str) =>
{
    var json = JSON.parse(str);
    for (var n = 0; n < json.data.length; n++)
    {
        delete json.data[n].full;
        delete json.data[n].original;
        delete json.data[n].thumb;
    }

   fs.writeFile(process.argv[2], JSON.stringify(json, null, 2), err => { })
})
