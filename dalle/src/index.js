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
            'Accept': 'application/json',
            'authorization': `bearer ${OPENAI_KEY}`
          },
          body: JSON.stringify(body)
        });
        var json = await res.json();
        return new Response(JSON.stringify(json.data), {
              headers: {
                "content-type": "application/json;charset=UTF-8",
              },
            });

    },
};


