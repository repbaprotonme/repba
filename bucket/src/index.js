export default
{
	async fetch(request, env, ctx)
    {
        const url = new URL(request.url);
        const key = url.pathname.slice(1);

        var headers = new Headers(
        {
            'Access-Control-Allow-Origin': '*',
		    'content-type': 'application/json;charset=UTF-8',
	    });

        switch (request.method.toUpperCase())
        {
            case 'PUT':
            case 'POST':
                var res = await env.BUCKET.put(key, request.body);
                return new Response(JSON.stringify(res), { headers });

            case 'GET':
                const object = await env.BUCKET.get(key);
                if (object === null)
                    return new Response(`${key} Not Found`, { status: 404 });
                return new Response(object.body, { headers });

            case 'DELETE':
                var res = await env.BUCKET.delete(key);
                return new Response(res, { headers });

            default:
                return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'PUT, POST, GET, DELETE', }, });
        }
    }
}
