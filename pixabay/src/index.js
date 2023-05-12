export default
{
	async fetch(request, env, ctx)
    {
        const PIXABAY_KEY = env.PIXABAY_KEY;
        var url = new URL(request.url);
        var search = url.searchParams.get("search");
        var page = url.searchParams.has("page") ? Number(url.searchParams.get("page")) : 0;
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
            json.hits.forEach(function(image)
            {
                image.description = image.tags;
                image.thumb = image.webformatURL;
                image.full = image.largeImageURL;
                image.original = image.largeImageURL;//imageURL after approved
                image.image_url = image.pageURL;
                image.photographer = image.user;
                image.photographer_url = `https://pixabay.com/users/${image.user}-${image.user_id}/`;
                image.photographer_id = image.user_id;
                image.ispng = image.original.toLowerCase().substr(image.original.length-4) == ".png"
                delete image.tags;
                delete image.type;
                 data.push(image);
            })

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
	    });

        return new Response(JSON.stringify(g), { headers, });


	},
}
