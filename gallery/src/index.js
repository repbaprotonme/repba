export default 
{
	async fetch(request, env, ctx) 
    {
        const url = new URL(request.url);
        const key = url.pathname.slice(1);

        let headers = new Headers(
        {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
            'Access-Control-Allow-Headers': '*'
	    });

        switch (request.method) 
        {
            case 'PUT':
                console.log(request.body);
                await env.MY_BUCKET.put(key, request.body);
                return new Response(`Put ${key} successfully!`);

            case 'GET':
                const object = await env.MY_BUCKET.get(key);
                if (object === null)
                    return new Response('Object Not Found', { status: 404 });
                return new Response(object.body, { headers, });
            
            case 'DELETE':
                await env.MY_BUCKET.delete(key);
                return new Response('Deleted!');

            default:
                return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'PUT, GET, DELETE, PATCH', }, });
        }
    }
}
