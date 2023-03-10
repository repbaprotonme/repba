export default
{
	async fetch(request, env, ctx)
    {
        var url = new URL(request.url);
        var search = url.searchParams.has("search") ? url.searchParams.get("search") :"";
        var page = url.searchParams.has("page") ? Number(url.searchParams.get("page")) :1;
        var per_page = 100;
        var data = [];
        var response = await fetch(`https://pixabay.com/api/?key=9775416-0c833e92d88d7c0fe7e79dbb0&q=${search}&image_type=photo&per_page=${per_page}&page=${page}`);
        var json = await response.json();
        for (var n = 0; n < json.hits.length; ++n)
        {
            var k = json.hits[n];
            var j = (page-1)*per_page+data.length+1;
            k.index = j+" of "+json.totalHits;
            k.thumb = k.webformatURL;
            k.full = k.fullHDURL;
            k.raw = k.fullHDURL;
            k.website = `Photos Provided by Pixibay`;
            k.photographer = k.user;
            k.photographer_url = k.pageURL;
            k.photographer_id = k.user_id;
            data.push(k);
        }

        var g = {}
        g.title = `Pixibay`;
        g.title1 = `Photos Provided by Pixibay`;
        g.repos = `pixibay`;
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
