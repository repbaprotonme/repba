//node print.js HOME
var id = process.argv[2];

return fetch("https://reportbase.com/gallery/" + id)
  .then(response => response.json())
  .then(function (json)
  {
      for (var n = 0; n < json.data.length; ++n)
      {
          var k = json.data;
        console.log(k[n]);
      }
  })


