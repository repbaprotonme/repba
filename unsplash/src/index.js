export default
{
	async fetch(request, env, ctx)
    {
        var url = new URL(request.url);
        var search = url.searchParams.get("search");
        var per_page = 30;
        var data = [];

        for (var page = 1; page <= 10; ++page)
        {
            var response = await fetch(`https://api.unsplash.com/search/photos?query=${search}&client_id=Xfabm2o5F9iUQon5LTX3O249PCsBpviDafSrMVGkaS0&per_page=${per_page}&page=${page}`);
            var json = await response.json();
            if (!json || !json.results || !json.results.length)
                break;
            for (var n = 0; n < json.results.length; ++n)
            {
                var k = json.results[n];
                var j = {};
                var width = k.width;
                var height = k.height;
                var aspect = (width/height).toFixed(2);
                var user = k.user;
                j.extent = `${width}x${height} ${aspect}`;
                j.size = ((width * height)/1000000).toFixed(1) + "MP";
                j.photographer = user.name;
                j.required = "Photos provided by Unsplash";
                j.photographer_url = user.portfolio_url;
                j.photographer_id = user.id;
                 if (k.description)
                    j.description = k.description;
                if (k.alt_description)
                    j.alt_description = k.alt_description;
                j.url = k.urls.raw;
                j.full = k.urls.raw;
                j.thumb = k.urls.small;
                j.created = k.created_at.substr(0,10);
                j.id = k.id;
                data.push(j);
            }
        }

        var g = {}
        g.title = `Unsplash Gallery`;
        g.title1 = `Photos Provided by Unsplash`;
        g.repos = "unsplash";
        g.row = 50;
        g.per_page = per_page;
        g.data = data;

        var headers = new Headers(
        {
		    'content-type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
            'Access-Control-Allow-Headers': '*'
	    });

        return new Response(JSON.stringify(g), { headers, });
	},
};
