export default
{
	async fetch(request, env, ctx)
    {
        const CLOUDFLARE_IMAGE_TOKEN = env.CLOUDFLARE_IMAGE_TOKEN;
        const CLOUDFLARE_ID = env.CLOUDFLARE_ID;
        var per_page = 100;
        var data = [];
        const url = new URL(request.url);

        const init =
        {
          headers:
          {
            'Authorization': `Bearer ${CLOUDFLARE_IMAGE_TOKEN}`,
            'Content-Type': 'application/json',
            'X-Auth-Email': 'reportbase@gmail.com',
          },
        };

        for (var page = 1; page <= 3; ++page)
        {
            var response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ID}/images/v1?per_page=${per_page}&page=${page}`, init);
            //todo ok
            var json = await response.json();
            var images = json.result.images;
            for (var n = 0; n < images.length; ++n)
            {
                var k = images[n];
                var j = {};
                j.id = k.id;
                data.push(j);
            }
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




