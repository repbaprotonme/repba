export default
{
  async fetch(request, env, ctx)
  {
    let CLOUDFLARE_ID = env.CLOUDFLARE_ID;
    let CLOUDFLARE_IMAGE_TOKEN = env.CLOUDFLARE_IMAGE_TOKEN;
    let CLOUDFLARE_AUTH_KEY = env.CLOUDFLARE_AUTH_KEY;
    let CLOUDFLARE_AUTH_EMAIL = env.CLOUDFLARE_AUTH_EMAIL;
    let CLOUDFLARE_ACCOUNT_HASH = env.CLOUDFLARE_ACCOUNT_HASH;
    switch (request.method)
    {
      case 'REPORT':
      {
            const options =
            {
                method: 'GET',
                headers:
                {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Methods': 'GET, DELETE, POST, REPORT, PATCH',
                    'Authorization': `Bearer ${CLOUDFLARE_IMAGE_TOKEN}`,
                    'X-Auth-Key': `${CLOUDFLARE_AUTH_KEY}`,
                    'X-Auth-Email': `${CLOUDFLARE_AUTH_EMAIL}`,
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*'
                }
            };

            var id = request.url.split("/").slice(-1).join("/");
            return fetch(`https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ID}/images/v1/${id}`, options);
      }
      case 'PATCH':
      {
          const options =
            {
                method: 'PATCH',
                headers:
                {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Methods': 'GET, DELETE, POST, REPORT, PATCH',
                    'Authorization': `Bearer ${CLOUDFLARE_IMAGE_TOKEN}`,
                    'X-Auth-Key': `${CLOUDFLARE_AUTH_KEY}`,
                    'X-Auth-Email': `${CLOUDFLARE_AUTH_EMAIL}`,
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*'
                },
                body: '{"metadata":{},"requireSignedURLs":false}'
            };

            var id = request.url.split("/").slice(-1).join("/");
            return fetch(`https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ID}/images/v1/${id}`, options);
      }
      case 'POST':
      {
const body = await request.json()
    return new Response(JSON.stringify(body), {
      headers: {
        "content-type": "application/json",
      },
    });


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
                        'Authorization': `Bearer ${CLOUDFLARE_IMAGE_TOKEN}`,
                        'X-Auth-Key': `${CLOUDFLARE_AUTH_KEY}`,
                        'X-Auth-Email': `${CLOUDFLARE_AUTH_EMAIL}`,
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': '*'
                    }
                };

                var suffix = request.url.split("/").slice(-2).join("/")
                return fetch(`https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ID}/images/v1/${suffix}`, options)
            }
            else
            {
                var suffix = request.url.split("/").slice(-2).join("/")
                return fetch(`https://imagedelivery.net/${CLOUDFLARE_ACCOUNT_HASH}/${suffix}`)
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
                    'Authorization': `Bearer ${CLOUDFLARE_IMAGE_TOKEN}`,
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*'
                }
            };

            var id = request.url.split("/").slice(-1).join("/");
            return fetch(`https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ID}/images/v1/${id}`, options);
      }
      default:
      {
            return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'PUT, GET, DELETE, PATCH, REPORT', }, });
      }
    }
  },
};

