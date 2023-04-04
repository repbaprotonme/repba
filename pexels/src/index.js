export default
{
	async fetch(request, env, ctx)
    {
        const PEXEL_KEY = env.PEXEL_KEY;
        const per_page = 80;
        var data = [];
        var url = new URL(request.url);
        var search = url.searchParams.get("search");

        var init =
        {
          headers:
          {
            'Authorization': PEXEL_KEY
          },
        };

        for (var page = 1; page <= 10; ++page)
        {
            var response = await fetch(`https://api.pexels.com/v1/search?query=${search}&per_page=${per_page}&page=${page}`, init);
            var json = await response.json();
            for (var n = 0; n < json.photos.length; ++n)
            {
                var k = json.photos[n];
                var j = {};
                var width = k.width;
                var height = k.height;
                var aspect = (width/height).toFixed(2);
                j.id = k.id+"";
                j.extent = `${width}x${height} ${aspect}`;
                j.size = ((width * height)/1000000).toFixed(1) + "MP";
                j.photographer = k.photographer;
                j.required  = "Photos provided by Pexels";
                j.photographer_url = k.photographer_url;
                j.photographer_id = k.photographer_id;
                if (k.alt)
                    j.description = k.alt;
                j.original = k.src.original;
                j.image_url = k.url;
                if (width > height)
                    j.full = `${j.original}?auto=compress&cs=tinysrgb&fit=crop&h=1080&w=2160`;
                else
                    j.full = `${j.original}?auto=compress&cs=tinysrgb&fit=crop&h=2160&w=1080`;

                j.thumb = k.src.medium;
                data.push(j);
            }
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




