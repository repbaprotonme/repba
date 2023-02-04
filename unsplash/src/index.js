//https://unsplash.com/documentation#list-a-users-photos
//https://www.pluralsight.com/guides/using-the-unsplash-api
//todo api.unsplash.com/search/photos?page=5&per_page=30&query=${inputValue}&client_id=${API_KEY}`

export default 
{
	async fetch(request, env, ctx) 
    {
        var lst = [];
        for (var m = 0; m < 6; ++m)
        {
            var id = "anitaaustvika"
            var per_page = 10;
            var page = m+1;
            var response = await fetch(`https://api.unsplash.com/users/${id}/photos?client_id=Xfabm2o5F9iUQon5LTX3O249PCsBpviDafSrMVGkaS0&per_page=${per_page}&page=${page}`);
            var json = await response.json();   
            for (var n = 0; n < json.length; ++n)
            {
                var k = json[n];
                var j = {};
                var width = k.width;
                var height = k.height;
                var aspect = (k.width/k.height).toFixed(2);
                var user = k.user;
                var urls = k.urls;
                j.index = (n+1).toFixed(0); 
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
