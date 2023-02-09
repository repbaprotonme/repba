//node print.js JESU | jq > JESU 
var id = process.argv[2];

return fetch("https://reportbase.com/gallery/" + id)
  .then(response => response.json())
  .then(function (json)
  {
        for (var n = 0; n < json.datam.length; ++n)
        {
            var k = json.datam[n];
            var aspect = k.width && k.height;
            if (aspect)
            {
                aspect = (k.width/k.height).toFixed(2);
                k.extent = `${k.width}x${k.height} ${aspect}`;
                k.size = ((k.width * k.height)/1000000).toFixed(1) + "MP";
            }
        }
    
        console.log(JSON.stringify(json));
  })


