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
        var page = url.searchParams.has("page") ? url.searchParams.get("page") : 0;

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
            for (var m = 0; m < json.media.length; ++m)
            {
                var k = json.media[m];
                if (k.type.toLowerCase() != "photo")
                    continue;
                var j = {};
                var width = k.width;
                var height = k.height;
                var aspect = (width/height).toFixed(2);
                j.id = k.id+"";
                j.extent = `${width}x${height} ${aspect}`;
                j.size = ((width * height)/1000000).toFixed(1) + "MP";
                j.photographer = k.photographer;
                j.datasource = "Pexels";
                j.credit  = `Photo by ${j.photographer} from Pexels`
                j.photographer_url = k.photographer_url;
                j.photographer_id = k.photographer_id;
                if (k.alt)
                  j.description = k.alt;
                j.image_url = k.url;
                j.original = k.src.original;
                j.thumb = k.src.medium;
                if (width > height)
                    j.full = `${j.original}?auto=compress&cs=tinysrgb&fit=crop&h=1080&w=2160`;
                else
                    j.full = `${j.original}?auto=compress&cs=tinysrgb&fit=crop&h=2160&w=1080`;
                data.push(j);
            }

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




