export default {
  async fetch(request) {

    switch (request.method) {
      case 'REPORT':
      {
            const options =
            {
                method: 'GET',
                headers:
                {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Methods': 'GET, DELETE, POST, REPORT, PATCH',
                    'Authorization': 'Bearer hXCWi4iJ8wDztj3LUWqzqXyqjgPCmPypnr5Rjkjb',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                }
            };

            var id = request.url.split("/").slice(-1).join("/");
            return fetch(`https://api.cloudflare.com/client/v4/accounts/41f6f507a22c7eec431dbc5e9670c73d/images/v1/${id}`, options);
      }
      case 'PATCH':
      {
            //https://developers.cloudflare.com/api/operations/cloudflare-images-update-image
          const options =
            {
                method: 'PATCH',
                headers:
                {
                    'Authorization': 'Bearer hXCWi4iJ8wDztj3LUWqzqXyqjgPCmPypnr5Rjkjb',
                    'X-Auth-Key': 'd27e8f43b04336d419f9b85927dc1e25bb915',
                    'X-Auth-Email': 'reportbase@gmail.com'
                },
                body: '{"metadata":{},"requireSignedURLs":false}'
            };

            var id = request.url.split("/").slice(-1).join("/");
            return fetch(`https://api.cloudflare.com/client/v4/accounts/41f6f507a22c7eec431dbc5e9670c73d/images/v1/${id}`, options);
      }
      case 'PUT':
      {
            return new Response(`"""PUT!`);
      }
      case 'GET':
      {
            var suffix = request.url.split("/").slice(-1).join("/")
            if (suffix == "blob")
            {
                const options =
                {
                    method: 'GET',
                    headers:
                    {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Methods': 'GET, DELETE, POST, REPORT, PATCH',
                        'Authorization': 'Bearer hXCWi4iJ8wDztj3LUWqzqXyqjgPCmPypnr5Rjkjb',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': '*'
                    }
                };

                var suffix = request.url.split("/").slice(-2).join("/")
                return fetch(`https://api.cloudflare.com/client/v4/accounts/41f6f507a22c7eec431dbc5e9670c73d/images/v1/${suffix}`, options)
            }
            else
            {
                //https://reportbase.com/image/BAKE.0000/quality=85,fit=crop,width=2112,height=2840
                var suffix = request.url.split("/").slice(-2).join("/")
                return fetch(`https://imagedelivery.net/w9Lvwo1EAmYzHfbI5TkJ7g/${suffix}`)
            }
      }
      case 'DELETE':
      {
            const options =
            {
                method: 'DELETE',
                headers:
                {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Methods': 'GET, DELETE, POST, REPORT, PATCH',
                    'Authorization': 'Bearer hXCWi4iJ8wDztj3LUWqzqXyqjgPCmPypnr5Rjkjb',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*'
                }
            };

            var id = request.url.split("/").slice(-1).join("/");
            return fetch(`https://api.cloudflare.com/client/v4/accounts/41f6f507a22c7eec431dbc5e9670c73d/images/v1/${id}`, options);
      }
      default:
      {
            return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'PUT, GET, DELETE, PATCH, REPORT', }, });
      }
    }
  },
};

