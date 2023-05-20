export default
{
	async fetch(request, env, ctx)
    {
        const CLOUDFLARE_IMAGE_TOKEN = env.CLOUDFLARE_IMAGE_TOKEN;
        const CLOUDFLARE_ID = env.CLOUDFLARE_ID;
        const per_page = 100;
        const pages = 6;
        const url = new URL(request.url);
        var page = url.searchParams.has("page") ? Number(url.searchParams.get("page")) : 0;
        var data = [];

        var start = page*pages;
        var finish = (page+1)*pages;
        for (var n = start; n < finish; ++n)
        {
            var response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ID}/images/v1?per_page=${per_page}&page=${n+1}`,
            {
                headers:
                  {
                    'Authorization': `Bearer ${CLOUDFLARE_IMAGE_TOKEN}`,
                    'Content-Type': 'application/json',
                    'X-Auth-Email': 'reportbase@gmail.com',
                  },
            });

            if (!response.ok)
                break;
            var json = await response.json();
            var images = json.result.images;
            images.forEach(function(image)
            {
                delete image.variants;
                image = Object.assign(image, image.meta);
                image.ispng = image.filename.toLowerCase().substr(image.filename.length-4) == ".png"
                delete image.meta;
                data.push(image);
            })

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
	    });

        return new Response(JSON.stringify(g), { headers, });
	},
};




