//node get.js HOME
var id = process.argv[2];

return fetch("https://bucket.reportbase5836.workers.dev/gallery/" + id)
  .then(response => response.json())
  .then(function(json)
      {
        var data = [];
        for (var n = 0; n < json.datam.length; ++n)
        {
            var k = json.datam[n];
            var j = {};
            var width = k.width;
            var height = k.height;
            var aspect = (k.width/k.height).toFixed(2);
            j.id = k.src;
            j.index = (data.length+1)+" of "+json.datam.length;
            j.extent = `${width}x${height} ${aspect}`;
            j.size = ((width * height)/1000000).toFixed(1) + "MP";
            if (k.describe)
                j.describe = k.describe;
            j.original = `https://reportbase.com/image/${j.id}/quality=85`;
            j.full = `https://reportbase.com/image/${j.id}/quality=85,w=2160`;
            j.thumb = `https://reportbase.com/image/${j.id}/quality=85,w=540`;
            data.push(j);
        }

        var g = {}
        g.title = `Repba Gallery`;
        g.data = data;

            console.log(JSON.stringify(g));
      }
  )


