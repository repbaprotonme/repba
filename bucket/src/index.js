export default
{
	async fetch(request, env, ctx)
    {
        const url = new URL(request.url);
        const key = url.pathname.slice(1);
        var a = await env.KV.put("XXX","YYY");
        var b = await env.KV.get("XXX");

        let headers = new Headers(
        {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
            'Access-Control-Allow-Headers': '*'
	    });

        switch (request.method)
        {
            case 'PUT':
                await env.BUCKET.put(key, request.body);
                return new Response(`Put ${key} successfully ${b}!\n`);

            case 'POST':
                await env.BUCKET.put(key, request.body);
                return new Response(`Post ${key} successfully ${b}!\n`);

            case 'GET':
                const object = await env.BUCKET.get(key);
                if (object === null)
                    return new Response(`${key} Not Found`, { status: 404 });
                return new Response(object.body, { headers, });

            case 'DELETE':
                await env.BUCKET.delete(key);
                return new Response(`${key} Deleted!`);

            default:
                return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'PUT, GET, DELETE, PATCH', }, });
        }
    }
}
