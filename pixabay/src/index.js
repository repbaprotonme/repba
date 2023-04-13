export default
{
	async fetch(request, env, ctx)
    {
        const PIXABAY_KEY = env.PIXABAY_KEY;
        var url = new URL(request.url);
        var search = url.searchParams.get("search");
        var page = url.searchParams.has("page") ?url.searchParams.get("page") : 0;
        var per_page = 100;
        var data = [];
        var pages = 6;//seems to be the max
        var start = page*pages;
        var finish = (page+1)*pages;
        for (var n = start; n < finish; ++n)
        {
            var response = await fetch(`https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${search}&image_type=photo&per_page=${per_page}&page=${n+1}`)
            if (!response.ok)
                break;
            var json = await response.json()
            for (var m = 0; m < json.hits.length; ++m)
            {
                var k = json.hits[m];
                k.thumb = k.webformatURL;
                k.full = k.largeImageURL;
                k.original = k.largeImageURL;//imageURL after approved
                k.image_url = k.pageURL;
                k.website = `Photos Provided by Pixabay`;
                k.photographer = k.user;
                k.datasource = "Pixabay";
                k.credit  = `Photo by ${k.photographer} from Pixabay`
                k.photographer_url = `https://pixabay.com/users/${k.user}-${k.user_id}/`;
                k.photographer_id = k.user_id;
                data.push(k);
            }

            if (json.hits.length < per_page)
                break;
        }

        var g = {}
        g.title = `Pixabay`;
        g.repos = `pixabay`;
        g.hits = json.hits.length;
        g.per_page = per_page;
        g.start = start;
        g.finish = finish;
        g.total = json.totalHits;
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
