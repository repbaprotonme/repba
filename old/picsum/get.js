//node get.js 
    
async function f1() 
{
    var lst = [];
    for (var n = 1; n < 20; n++)
    {
        var response = await fetch(`https://picsum.photos/v2/list?page=${n}&limit=100`);
        var json = await response.json();   
        lst = lst.concat(json);
    }
    
    for (var n = 0; n < lst.length; n++)
    {
        var width = lst[n].width;
        var height = lst[n].height;
        var aspect = (lst[n].width/lst[n].height).toFixed(2);
        lst[n].src = lst[n].download_url;
        lst[n].extent = `${width}x${height} ${aspect}`;
        delete lst[n].download_url;
    }

    console.log(JSON.stringify(lst));
}

f1();

