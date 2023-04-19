//node list.js
const CLOUDFLARE_IMAGE_BEARER = process.env.CLOUDFLARE_IMAGE_BEARER;
const CLOUDFLARE_AUTH_KEY = process.env.CLOUDFLARE_AUTH_KEY;
const CLOUDFLARE_ID = process.env.CLOUDFLARE_ID;

var lst = [];
for (var page = 1; page < 2; ++page)
{
    const options =
    {
        method: 'GET',
        headers:
        {
            'Content-Type': 'application/json',
            'Authorization': `${CLOUDFLARE_IMAGE_BEARER}`,
            'X-Auth-Email': 'reportbase@gmail.com',
            'X-Auth-Key': `${CLOUDFLARE_AUTH_KEY}`,
        }
    };

    fetch(`https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ID}/images/v1?page=${page}`, options)
      .then(response =>
           {
               return response.json()
           })
      .then(function(json)
          {
                console.log(JSON.stringify(json));
              console.log(json.result.images.length);
          })
      .catch(err => console.error(err));
}
