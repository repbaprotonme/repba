//node get.js

async function user()
{
    var per_page = 30;
    var page = 1;
    var response = await fetch(`https://api.unsplash.com/users/repba/photos?client_id=Xfabm2o5F9iUQon5LTX3O249PCsBpviDafSrMVGkaS0&per_page=${per_page}&page=${page}`);
    var json = await response.json();
    console.log(json);
}

async function user2()
{
    var per_page = 30;
    var page = 1;
    var response = await fetch(`https://unsplash_user.reportbase5836.workers.dev?search=repba`);
    var json = await response.json();
    console.log(json);
}

user2();
