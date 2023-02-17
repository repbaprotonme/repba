export default
{
	async fetch(request, env, ctx)
    {
        //todo move to global folder
        function getwh(w, h, maxsize)
        {
            var a = w/h;
            if (w > h)
            {
                while (w*h >= maxsize)
                {
                    w *= 0.999;
                    h = w/a;
                }

                w = Math.ceil(w/100)*100;
                h = Math.ceil(w/a);
            }
            else
            {
                while (w*h >= maxsize)
                {
                    h *= 0.999;
                    w = a*h;
                }

                h = Math.ceil(h/100)*100;
                w = Math.ceil(a*h);
            }

            return {width:w, height:h}
        }

        var url = new URL(request.url);
        var k = url.pathname.split("/");
        if (k.length < 3)
            return;
        var collection = k[1];
        var id = k[2];
        var per_page = 30;
        var lst = [];
        var page = 1;
        var morePagesAvailable = true;
        while (morePagesAvailable)
        {
            var response = await fetch(`https://api.unsplash.com/${collection}/${id}/photos?client_id=Xfabm2o5F9iUQon5LTX3O249PCsBpviDafSrMVGkaS0&per_page=${per_page}&page=${page}`);
            const headers = response.headers;
            var total = headers.get("x-total")
            var data = await response.json();
            for (var n = 0; n < data.length; ++n)
            {
                var k = data[n];
                var j = {};
                var e = getwh(k.width, k.height, 6000000)
                var width = e.width;
                var height = e.height;
                var aspect = (width/height).toFixed(2);
                var user = k.user;
                var urls = k.urls;
                j.index = (lst.length+1)+" of "+total;
                j.name = user.name;
                j.extent = `${width}x${height} ${aspect}`;
                j.size = ((width * height)/1000000).toFixed(1) + "MP";
                if (k.description)
                    j.description = k.description;
                if (k.alt_description)
                    j.alt_description = k.alt_description;
                j.original = urls.raw;
                j.full = urls.raw+`&h=${height}&q=85`;
                j.thumb = urls.raw+"&w=600&h=600&q=85&fit=crop";
                j.created = k.created_at.substr(0,10);
                j.id = k.id;
                lst.push(j);
            }

            morePagesAvailable = (page++ <= 2);// || lst.length < total;
        }

        var g = {}
        g.title = `Unsplash Gallery`;
        g.username = id;
        g.row = 50;
        g.data = lst;

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
