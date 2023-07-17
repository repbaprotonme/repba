export default
{
	async fetch(request, env, ctx)
    {
        const UNSPLASH_KEY = env.UNSPLASH_KEY
        var url = new URL(request.url);
        var search = url.searchParams.get("search");
        var page = url.searchParams.has("page") ? Number(url.searchParams.get("page")) : 0;
        var per_page = 30;
        var pages = 8;
        var data = [];
        var start = page*pages;
        var finish = (page+1)*pages;
        for (var n = start; n < finish; ++n)
        {
            var response = await fetch(`https://api.unsplash.com/search/photos?query=${search}&client_id=${UNSPLASH_KEY}&per_page=${per_page}&page=${n+1}`);
            if (!response.ok)
                break;
            var json = await response.json();
            json.results.forEach(function(image)
            {
                var j = {};
                var width = image.width;
                var height = image.height;
                var aspect = (width/height).toFixed(2);
                var user = image.user;
                j.width = width;
                j.height = height;
                j.id = image.id;
                j.photographer = user.name;
                j.photographer_url = user.links.html;
                j.photographer_id = user.id;
                j.description = image.description?image.description:"";
                if (image.alt_description)
                    j.description += " " + image.alt_description;
                j.image_url = image.links.html;
                j.original = image.urls.raw;
                if (width > height)
                    j.full = `${j.original}&q=80&h=1080`;
                else
                    j.full = `${j.original}&q=80&w=2160`;
                j.thumb = image.urls.small;
                j.created = image.created_at.substr(0,10);
                data.push(j);
            })

            if (json.results.length < per_page)
                break;
        }

        var g = {}
        g.title = `Unsplash Gallery`;
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
