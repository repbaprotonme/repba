export default
{
	async fetch(request, env, ctx)
    {
        const PEXEL_KEY = env.PEXEL_KEY;
        const per_page = 80;
        const pages = 4;
        var data = [];
        var url = new URL(request.url);
        var search = url.searchParams.get("search");
        var page = url.searchParams.has("page") ? Number(url.searchParams.get("page")) : 0;

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
            var response = await fetch(`https://api.pexels.com/v1/collections/${search}?per_page=${per_page}&page=${n+1}`, init);
            if (!response.ok)
                break;
            var json = await response.json();
            if (!json.media)
                break;
            json.media.forEach(function(image)
            {
                if (!image.type || image.type.toLowerCase() != "photo")
                    return;
                var j = {};
                var width = image.width;
                var height = image.height;
                j.photographer = image.photographer;
                j.photographer_url = image.photographer_url;
                j.photographer_id = image.photographer_id;
                j.description = image.alt;
                j.image_url = image.url;
                j.original = image.src.original;
                j.thumb = image.src.medium;
                j.ispng = j.original.toLowerCase().substr(j.original.length-4) == ".png"
                if (width > height)
                    j.full = `${j.original}?auto=compress&cs=tinysrgb&fit=crop&h=1080&w=2160`;
                else
                    j.full = `${j.original}?auto=compress&cs=tinysrgb&fit=crop&h=2160&w=1080`;
                data.push(j);
            })

            if (json.media.length < per_page)
                break;
        }

        var g = {}
        g.title = `Pexels Collection`;
        g.repos = `pexels_collection`;
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




