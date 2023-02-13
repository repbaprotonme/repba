export default 
{
	async fetch(request, env, ctx) 
    {
        /*
        const url = 'https://api.pexels.com/v1/curated?per_page=80&page=1'
        async function gatherResponse(response) {
          const { headers } = response;
          const contentType = headers.get('content-type') || '';
          if (contentType.includes('application/json')) {
            return JSON.stringify(await response.json());
          }
          return response.text();
        }

        const init = {
          headers: {
            'Authorization': "F8k2ebLZ7fIjWegfAZpNerv98JnIK7oYMkCdnXE3eqpscBKZuTFUZLoO"
          },
        };
        
        const response = await fetch(url, init);
        const results = await gatherResponse(response);
        return new Response(results, init);
        */

        var per_page = 80;
        var lst = [];
        var page = 1;
        var morePagesAvailable = true;
        while (morePagesAvailable)
        {
            const init = {
              headers: {
                'Authorization': "F8k2ebLZ7fIjWegfAZpNerv98JnIK7oYMkCdnXE3eqpscBKZuTFUZLoO"
              },
            };
            
            var response = await fetch(`https://api.pexels.com/v1/curated?per_page=${per_page}&page=${page}`, init);
            var json = await response.json();
            lst = lst.concat(json);
            /*
            for (var n = 0; n < json.photos.length; ++n)
            {
                var k = json.photos[n];
                var j = {};
                var width = k.width;
                var height = k.height;
                var aspect = (k.width/k.height).toFixed(2);
                var user = k.photographer;
                var urls = k.urls;
                j.index = (lst.length+1)+" of "+total;
                j.name = user.name;
                j.extent = `${width}x${height} ${aspect}`;
                j.size = ((width * height)/1000000).toFixed(1) + "MP";
                if (k.alt)
                    j.description = k.alt;
                if (k.alt_description)
                    j.alt_description = k.alt_description;
                j.src = k.url.original;
                j.full = k.url.original+"?auto=compress&cs=tinysrgb&w=2160";
                lst.push(j);
            }
                */

            morePagesAvailable = (page++ <= 2);// || lst.length < total;
        }

        var g = {}
        g.title = `Pexels  Gallery`;
        g.datam = lst;

        let headers = new Headers(
        {
		    'content-type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
            'Access-Control-Allow-Headers': '*'
	    });

        return new Response(JSON.stringify(g), { headers, });

	},
};
