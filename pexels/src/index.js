export default
{
	async fetch(request, env, ctx)
    {
        var per_page = 80;
        var data = [];
        var page = 1;
        var total = 1000;
        var morePagesAvailable = true;
        while (morePagesAvailable)
        {
            const init =
            {
              headers:
              {
                'Authorization': "F8k2ebLZ7fIjWegfAZpNerv98JnIK7oYMkCdnXE3eqpscBKZuTFUZLoO"
              },
            };

            var response = await fetch(`https://api.pexels.com/v1/curated?per_page=${per_page}&page=${page}`, init);
            var json = await response.json();
            for (var n = 0; n < json.photos.length; ++n)
            {
                var k = json.photos[n];
                var j = {};
                var width = k.width;
                var height = k.height;
                var aspect = (k.width/k.height).toFixed(2);
                var user = k.photographer;
                var urls = k.urls;
                j.index = (data.length+1)+" of "+json.total_results;
                j.name = user.name;
                j.extent = `${width}x${height} ${aspect}`;
                j.size = ((width * height)/1000000).toFixed(1) + "MP";
                if (k.alt)
                    j.description = k.alt;
                j.thumb = k.src.original+"?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop";
                j.full = k.src.original+"?auto=compress&cs=tinysrgb&h=2160";
                data.push(j);
            }

            morePagesAvailable = (page++ <= 6);// || data.length < total;
        }

        var g = {}
        g.title = `Pexels  Gallery`;
        g.data = data;

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




