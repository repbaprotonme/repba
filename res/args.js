const fs = require('fs');
const args = process.argv;

var json = {};
json.data = []
 for (var n = 0; n < args.length; ++n)
{
    var k = {};
    var name = args[n].split("/").pop();
    k.url = `http://reportbase.me/data/${name}`;
    json.data.push(k);
}

console.log(JSON.stringify(json));
