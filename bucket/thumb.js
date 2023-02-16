//node get.js HOME
var id = process.argv[2];

return fetch("https://bucket.reportbase5836.workers.dev/gallery/" + id)
  .then(response => response.json())
  .then(function(json)
      {
        for (var n = 0; n < json.data.length; ++n)
        {
            var k = json.data[n];
            k.thumb = `https://reportbase.com/image/${k.id}/quality=85,fit=crop,width=500,height=500`;
        }

           console.log(JSON.stringify(json));
      }
  )


