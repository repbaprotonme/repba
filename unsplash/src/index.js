//https://unsplash.com/documentation#list-a-users-photos
//https://www.pluralsight.com/guides/using-the-unsplash-api

// curl https://unsplash.reportbase5836.workers.dev?id=anitaaustvika
// curl https://unsplash.reportbase5836.workers.dev?query=soccer

export default 
{
	async fetch(request, env, ctx) 
    {
        var url = new URL(request.url);
        var id = url.searchParams.get("id");
        var query = url.searchParams.get("query");
        var per_page = 10;
        var page = 0;
        var lst = [];
        var morePagesAvailable = true;
        while (morePagesAvailable)
        {
            var response = await fetch(`https://api.unsplash.com/users/${id}/photos?client_id=Xfabm2o5F9iUQon5LTX3O249PCsBpviDafSrMVGkaS0&per_page=${per_page}&page=${page}`);
            const headers = response.headers;
            var total = headers.get("x-total")
            var data = await response.json();   
            for (var n = 0; n < data.length; ++n)
            {
                var k = data[n];
                var j = {};
                var width = k.width;
                var height = k.height;
                var aspect = (k.width/k.height).toFixed(2);
                var user = k.user;
                var urls = k.urls;
                j.index = lst.length; 
                j.username = user.username; 
                j.name = user.name; 
                if (k.description)
                    j.description = k.description; 
                if (k.alt_description)
                    j.alt_description = k.alt_description; 
                j.src = urls.raw; 
                j.extent = `${width}x${height} ${aspect}`;
                lst.push(j);
            }
            
            morePagesAvailable = (++page < 3) || lst.length < total;
        }

        var g = {}
        g.title = `Unsplash Gallery`;
        g.username = id;
        g.datam = lst;		
        
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
