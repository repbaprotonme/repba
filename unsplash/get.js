//node get.js 

async function user2() 
{
    var response = await fetch(`https://unsplash.reportbase5836.workers.dev`);
    var json = await response.json();   
    console.log(JSON.stringify(json));
}

//user2();

async function user() 
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

    console.log(JSON.stringify(json));
}

user();
