//node get.js

async function user()
{
    var per_page = 30;
    var page = 1;
    var response = await fetch(`https://api.unsplash.com/collections/3326482/photos?client_id=Xfabm2o5F9iUQon5LTX3O249PCsBpviDafSrMVGkaS0&per_page=${per_page}&page=${page}`);
    var json = await response.json();
    console.log(json);
}

async function user2()
{
    var per_page = 30;
    var page = 1;
    var response = await fetch(`https://unsplash_collection.reportbase5836.workers.dev?search=3326482`);
    var json = await response.json();
    console.log(json);
}

user();
