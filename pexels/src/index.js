export default
{
	async fetch(request, env, ctx)
    {
        const PEXEL_KEY = env.PEXEL_KEY;
        const per_page = 80;
        var data = [];
        var url = new URL(request.url);
        var search = url.searchParams.get("search");
        var page = url.searchParams.has("page") ? Number(url.searchParams.get("page")) : 0;
        var pages = 8;

        var init =
        {
          headers:
          {
            'Authorization': PEXEL_KEY
          },
        };

        var start = page*pages;
        var finish = (page+1)*pages;
        for (var n = start; n < finish; ++n)
        {
            var response = await fetch(`https://api.pexels.com/v1/search?query=${search}&per_page=${per_page}&page=${n+1}`, init);
            if (!response.ok)
                break;
            var json = await response.json();
            json.photos.forEach(function(image)
            {
                var j = {};
                var width = image.width;
                var height = image.height;
                j.photographer = image.photographer;
                j.photographer_url = image.photographer_url;
                j.photographer_id = image.photographer_id;
                j.description = image.alt;
                j.original = image.src.original;
                j.image_url = image.url;
                j.thumb = image.src.medium;
                if (width > height)
                    j.full = `${j.original}?auto=compress&cs=tinysrgb&fit=crop&h=1080&w=2160`;
                else
                    j.full = `${j.original}?auto=compress&cs=tinysrgb&fit=crop&h=2160&w=1080`;
                data.push(j);
            })

            if (json.photos.length < per_page)
                break;
        }

        var g = {}
        g.title = `Pexels Images`;
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




