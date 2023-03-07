export default
{
	async fetch(request, env, ctx)
    {
        function getwh(w, h, maxsize)
        {
            var a = w/h;
            if (w > h)
            {
                while (w*h >= maxsize)
                {
                    w *= 0.999;
                    h = w/a;
                }

                w = Math.ceil(w/100)*100;
                h = Math.ceil(w/a);
            }
            else
            {
                while (w*h >= maxsize)
                {
                    h *= 0.999;
                    w = a*h;
                }

                h = Math.ceil(h/100)*100;
                w = Math.ceil(a*h);
            }

            return {width:w, height:h}
        }

        var data = [];
        const url = new URL(request.url);
        var page = url.searchParams.has("page") ? Number(url.searchParams.get("page")) :1;
        var per_page = 80;

        var init =
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
            var e = getwh(k.width, k.height, 6000000)
            var width = e.width;
            var height = e.height;
            var aspect = (width/height).toFixed(2);
            var urls = k.urls;
            j.id = k.id+"";
            j.index = (data.length+1)+" of "+json.total_results;
            j.extent = `${width}x${height} ${aspect}`;
            j.size = ((width * height)/1000000).toFixed(1) + "MP";
            j.photographer = k.photographer;
            j.required  = "Photos provided by Pexels";
            j.photographer_url = k.photographer_url;
            j.photographer_id = k.photographer_id;
            if (k.alt)
                j.description = k.alt;
            j.raw = k.src.original;
            j.full = k.src.original;
            j.thumb = k.src.large;
            data.push(j);
        }

        var g = {}
        g.title = `Pexels Curated`;
        g.title1 = `Photos Provided by Pexels`;
        g.repos = `pexels`;
        g.per_page = json.per_page;
        g.total = json.total_results;
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




