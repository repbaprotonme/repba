export default
{
	async fetch(request, env, ctx)
    {
        const data =
        {
            hello: "world",
        };

    const json = JSON.stringify(data, null, 2);

    return new Response(json, {
      headers: {
            'Access-Control-Allow-Origin': '*',
        "content-type": "application/json;charset=UTF-8",
      },
    });

    },
};


