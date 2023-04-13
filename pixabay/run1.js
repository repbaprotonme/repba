const PIXABAY_KEY = process.env.PIXABAY_KEY;
async function run()
{
    var search = "Animal";
    var page = 0;
    var per_page = 100;
    var data = [];
    var pages = 2;
    var start = page*pages;
    var finish = (page+1)*pages;
    for (var n = start; n < finish; ++n)
    {
        var response = fetch(`https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${search}&image_type=photo&per_page=${per_page}&page=${n+1}`)
        console.log(response.ok);
        if (!response.ok)
            break;
        var json = await response.json()
        console.log(json);
        for (var m = 0; m < json.hits.length; ++m)
        {
            var k = json.hits[m];
            k.thumb = k.webformatURL;
            k.full = k.largeImageURL;
            k.original = k.largeImageURL;//imageURL after approved
            k.image_url = k.pageURL;
            k.website = `Photos Provided by Pixabay`;
            k.photographer = k.user;
            k.datasource = "Pixabay";
            k.credit  = `Photo by ${k.photographer} from Pixabay`
            k.photographer_url = `https://pixabay.com/users/${k.user}-${k.user_id}/`;
            k.photographer_id = k.user_id;
            data.push(k);
        }

        if (json.hits.length < per_page)
            break;
    }

    console.log(data);
}

run();
