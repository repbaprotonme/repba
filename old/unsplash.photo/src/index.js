export default
{
	async fetch(request, env, ctx)
    {
        const UNSPLASH_KEY = env.UNSPLASH_KEY
        var url = new URL(request.url);
        var PHOTO_ID = url.searchParams.get("id");

        var response = await fetch(`https://api.unsplash.com/photos/${PHOTO_ID}?client_id=${UNSPLASH_KEY}`);
        var json = await response.json();

        var headers = new Headers(
        {
		    'content-type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
            'Access-Control-Allow-Headers': '*'
	    });

        return new Response(JSON.stringify(json), { headers, });
	},
};
