export default
{
	async fetch(request, env, ctx)
    {
        const CLOUDFLARE_IMAGE_TOKEN = env.CLOUDFLARE_IMAGE_TOKEN;
        const CLOUDFLARE_ID = env.CLOUDFLARE_ID;
        const per_page = 100;
        const url = new URL(request.url);
        var data = [];

        const init =
        {
          headers:
          {
            'Authorization': `Bearer ${CLOUDFLARE_IMAGE_TOKEN}`,
            'Content-Type': 'application/json',
            'X-Auth-Email': 'reportbase@gmail.com',
          },
        };

        var page = 0;
        var pages = 6;
        var start = page*pages;
        var finish = (page+1)*pages;
        for (var n = start; n < finish; ++n)
        {
            var response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ID}/images/v1?per_page=${per_page}&page=${n+1}`, init);
            if (!response.ok)
                break;
            var json = await response.json();
            var images = json.result.images;
            for (var m = 0; m < images.length; ++m)
            {
                var k = images[m];
                var j = {};
                j.id = k.id;
                data.push(j);
            }

            if (images.length < per_page)
                break;
        }

        var g = {}
        g.title = `Image Gallery`;
        g.total = data.length;
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




