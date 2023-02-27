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
                    'Authorization': 'Bearer hXCWi4iJ8wDztj3LUWqzqXyqjgPCmPypnr5Rjkjb'
                }
            };

            var id = request.url.split("/").slice(-1).join("/");
            return fetch(`https://api.cloudflare.com/client/v4/accounts/41f6f507a22c7eec431dbc5e9670c73d/images/v1/${id}`, options);
      }
      case 'PATCH':
      {
            return new Response(`"""PATCH`);
      }
      case 'PUT':
      {
            return new Response(`"""PUT!`);
      }
      case 'GET':
      {
            //https://reportbase.com/image/BAKE.0000/base
            var suffix = request.url.split("/").slice(-1).join("/")
            if (suffix == "blob")
            {
                const options =
                {
                    method: 'GET',
                    headers:
                    {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer hXCWi4iJ8wDztj3LUWqzqXyqjgPCmPypnr5Rjkjb'
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
            //https://reportbase.com/image/<IMAGE-ID>
            const options =
            {
                method: 'DELETE',
                headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer hXCWi4iJ8wDztj3LUWqzqXyqjgPCmPypnr5Rjkjb'
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

