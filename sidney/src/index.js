export default
{
	async fetch(request, env, ctx)
    {
        var per_page = 100;
        var data = [];
        const url = new URL(request.url);
        var page = url.searchParams.has("page") ? Number(url.searchParams.get("page")) :1;

        const init =
        {
          headers:
          {
            'Authorization': 'Bearer hXCWi4iJ8wDztj3LUWqzqXyqjgPCmPypnr5Rjkjb',
            'Content-Type': 'application/json',
            'X-Auth-Email': 'reportbase@gmail.com',
          },
        };

        var response = await fetch(`https://api.cloudflare.com/client/v4/accounts/41f6f507a22c7eec431dbc5e9670c73d/images/v1?per_page=${per_page}&page=${page}`, init);
        var json = await response.json();
        var images = json.result.images;
         for (var n = 0; n < images.length; ++n)
        {
            var k = images[n];
            var j = {};
            j.id = k.id;
            j.photographer = "";
            j.photographer_url = "";
            j.photographer_id = "";
            data.push(j);
        }


        var g = {}
        g.title = `reportbase.com`;
        g.title1 = `Sidney`;
        g.total = 4000;
        g.per_page = per_page;
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




