//node print.js JESUE > JESU 
var id = process.argv[2];

return fetch("https://reportbase.com/gallery/" + id)
  .then(response => response.json())
  .then(function (json)
  {
    if (!json.datam)
    {
        json.quality = "85";
        json.row = 50;
        json.datam = []
        for (var n = 0; n < json.data.length; ++n)
        {
            var k = json.data[n];
            var j = {}
            j.src = k[0];
            j.width = k[1];
            j.height = k[2];
            if (k[3])
                j.row = k[3];
            j.describe = "";
            j.name = "";
            j.title = "";
            j.copyright = "";
            json.datam[n] = j;
        }
    }

    delete json.data;
    console.log(JSON.stringify(json));
  })


