export default
{
	async fetch(request, env, ctx)
    {
        var url = new URL(request.url);
        var search = url.searchParams.get("search");
        var per_page = 100;
        var data = [];

        for (var page = 1; page <= 5; ++page)
        {
            var response = await fetch(`https://pixabay.com/api/?key=9775416-0c833e92d88d7c0fe7e79dbb0&q=${search}&image_type=photo&per_page=${per_page}&page=${page}`);
            var json = await response.json();
            if (!json || !json.hits || !json.hits.length)
                break;
            for (var n = 0; n < json.hits.length; ++n)
            {
                var k = json.hits[n];
                k.thumb = k.webformatURL;
                k.full = k.largeImageURL;
                k.url = k.largeImageURL;
                k.website = `Photos Provided by Pixabay`;
                k.photographer = k.user;
                k.photographer_url = k.pageURL;
                k.photographer_id = k.user_id;
                data.push(k);
            }
        }

        var g = {}
        g.title = `Pixabay`;
        g.title1 = `Photos Provided by Pixabay`;
        g.repos = `pixabay`;
        g.hits = json.hits.length;
        g.per_page = per_page;
        g.total = json.totalHits;
        g.totalhits = json.totalhits;
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
