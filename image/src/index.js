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
                    'Authorization': `Bearer ${CLOUDFLARE_IMAGE_TOKEN}`,
                    'X-Auth-Key': `${CLOUDFLARE_AUTH_KEY}`,
                    'X-Auth-Email': `${CLOUDFLARE_AUTH_EMAIL}`,
                    'Access-Control-Allow-Origin': '*',
                }
            };

            var id = request.url.split("/").slice(-1).join("/");
            return fetch(`https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ID}/images/v1/${id}`, options);
      }
      case 'DELETE':
      {
            const options =
            {
                method: 'DELETE',
                headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${CLOUDFLARE_IMAGE_TOKEN}`,
                    'X-Auth-Key': `${CLOUDFLARE_AUTH_KEY}`,
                    'X-Auth-Email': `${CLOUDFLARE_AUTH_EMAIL}`,
                    'Access-Control-Allow-Origin': '*',
                }
            };

            var id = request.url.split("/").slice(-1).join("/");
            return fetch(`https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ID}/images/v1/${id}`, options);
      }
      case 'PATCH':
      {
            const obj = await request.json()
            delete obj.url;
            var meta = JSON.stringify(obj);

            return fetch(`https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ID}/images/v1/${obj.id}`,
                {
                    method: "PATCH",
                    headers:
                    {
                        'Authorization': `Bearer ${CLOUDFLARE_IMAGE_TOKEN}`,
                    },
                    body: `{"metadata":${meta},"requireSignedURLs":false}`
                }
            );
      }
      case 'POST':
      {
            const obj = await request.json()
            const body = new FormData();
            if (obj.id)
                body.append("id", obj.id);
            body.append("url", obj.url);
            body.append("requireSignedURLs", "false");
            delete obj.url;
            body.append("metadata", JSON.stringify(obj));

            const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ID}/images/v1`,
                {
                    method: "POST",
                    headers:
                    {
                        "Authorization": `Bearer ${CLOUDFLARE_IMAGE_TOKEN}`,
                    },
                    body,
                }
            );

            if (!res.ok)
                return new Response('post failed', { status: 400 }, );

            var k = await res.json();
            return new Response(JSON.stringify(k.result), {
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
                        'Authorization': `Bearer ${CLOUDFLARE_IMAGE_TOKEN}`,
                        'X-Auth-Key': `${CLOUDFLARE_AUTH_KEY}`,
                        'X-Auth-Email': `${CLOUDFLARE_AUTH_EMAIL}`,
                        'Access-Control-Allow-Origin': '*',
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
      default:
      {
            return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'PUT, GET, DELETE, PATCH, REPORT', }, });
      }
    }
  },
};

