export default
{
	async fetch(request, env, ctx)
    {
        const per_page = 100;
        var data = [];
        var page = 1;
        while (true)
        {
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
                j.full = `https://reportbase.com/image/${j.id}/quality=85,fit=crop`;
                j.thumb = `https://reportbase.com/image/${j.id}/quality=85,fit=crop,width=600,height=600`,
                data.push(j);
            }

            break;
        }

        var g = {}
        g.title = `Reportbase.com`;
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




