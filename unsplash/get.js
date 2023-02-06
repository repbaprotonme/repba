//node get.js 

async function user() 
{
    var id = "repba";//anitaaustvika";
    var query = "bottle";
    var per_page = 10;
    var lst = [];
    var page = 0;
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

        console.log(page, lst.length, data.length, total);
        morePagesAvailable = (++page < 2);// || lst.length < total;
    }

    var g = {}
    g.title = `Unsplash Gallery`;
    g.username = id;
    g.datam = lst;		
    console.log(JSON.stringify(g));
}

//user();

async function search() 
{
    var id = "repba";//anitaaustvika";
    var query = "bottle";
    var per_page = 10;
    var lst = [];
    var page = 0;
    var morePagesAvailable = true;
    while (morePagesAvailable)
    {
        var response = await fetch(`https://api.unsplash.com/search/photos/?query=${query}&client_id=Xfabm2o5F9iUQon5LTX3O249PCsBpviDafSrMVGkaS0&per_page=${per_page}&page=${page}`);
        const headers = response.headers;
        var data = await response.json();   
        var total = data.total;
        for (var n = 0; n < data.results.length; ++n)
        {
            var k = data.results[n];
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

        console.log(page, lst.length, data.results.length, total);
        morePagesAvailable = (++page < 2);// || lst.length < total;
    }

    var g = {}
    g.title = `Unsplash Gallery`;
    g.username = id;
    g.datam = lst;		
    console.log(JSON.stringify(g));
}

search();
