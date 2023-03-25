export default
{
	async fetch(request, env, ctx)
    {
        let OPENAI_KEY = env.OPENAI_KEY;
        let PROMPTEXT = await request.text();
        var res = await fetch('https://api.openai.com/v1/images/generations',
        {
          method: 'POST',
          headers:
          {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'authorization': `bearer ${OPENAI_KEY}`
          },
          body: JSON.stringify({
            'prompt': `${PROMPTEXT}`,
            'n': 2,
            'size': '1024x1024'
          })
        });

        var json = await res.json();
        return new Response(JSON.stringify(json.data),
        {
          status: 200,
          headers:
          {
            'Access-Control-Allow-Origin': '*',
            "content-type": "application/json",
          },
        });
	},
};


