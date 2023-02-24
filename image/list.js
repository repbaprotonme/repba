//node list.js

var lst = [];
for (var page = 1; page < 4; ++page)
{
    const options =
    {
        method: 'GET',
        headers:
        {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer hXCWi4iJ8wDztj3LUWqzqXyqjgPCmPypnr5Rjkjb',
            'X-Auth-Email': 'reportbase@gmail.com',
            'X-Auth-Key': 'd27e8f43b04336d419f9b85927dc1e25bb915',
        }
    };

    fetch(`https://api.cloudflare.com/client/v4/accounts/41f6f507a22c7eec431dbc5e9670c73d/images/v1?page=${page}`, options)
      .then(response =>
           {
    //           console.log(response.headers);
               return response.json()
           })
      .then(function(json)
          {
                 // lst = lst.concat(json.result.images);
                //console.log(lst.length);
                console.log(JSON.stringify(json));
          })
      .catch(err => console.error(err));

}
