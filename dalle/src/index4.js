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

        async function upload(obj)
        {
            const res = await fetch('https://reportbase.com/image/',
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(obj),
            });

            const k = await res.json()
            return k.id;
        }

        for (var n = 0; n < json.data.length; n++)
        {
            //var id = await upload(json.data[n])
            //json.data[n].id = id;
        }

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


