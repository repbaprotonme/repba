export default
{
	async fetch(request, env, ctx)
    {
        let OPENAI_KEY = env.OPENAI_KEY;
        var body = await request.json();

        var res = await fetch('https://api.openai.com/v1/images/generations',
        {
          method: 'POST',
          headers:
          {
            'Content-Type': 'application/json',
            'authorization': `bearer ${OPENAI_KEY}`
          },
          body: JSON.stringify(body)
        });

        var json = await res.json();
        let headers = new Headers(
        {
		    'content-type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
	    });
        var data = json.data;
        for (var n = 0; n < data.length; ++n)
        {
            var k = data[n];
            k.full = k.url;
            delete k.url;
        }

        return new Response(JSON.stringify(data), { headers, });
    },
};

