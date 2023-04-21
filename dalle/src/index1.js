export default
{
	async fetch(request, env, ctx)
    {
        let OPENAI_KEY = env.OPENAI_KEY;
    const formData = await request.formData();
    const body = {};
    for (const entry of formData.entries())
      body[entry[0]] = entry[1];
    var PROMPTEXT = body["prompt"];

        try
        {
            var res = await fetch('https://api.openai.com/v1/images/generations',
            {
              method: 'POST',
              headers:
              {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization': `bearer ${OPENAI_KEY}`
              },
              body: JSON.stringify(
              {
                'prompt': `${PROMPTEXT}`,
                'n': 10,
                'size': '1024x1024'
              })
            });
            var json = await res.json();

            async function upload(obj)
            {
                const res = await fetch('https://reportbase.com/image/',
                {
                  method: 'POST',
                  headers:
                  {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(obj),
                });

                const json = await res.json()
                return json.id;
            }

            let gallery = Date.now().toString(36) + Math.random().toString(36).substring(2);

            for (var n = 0; n < json.data.length; n++)
            {
                var k = json.data[n];
                k["prompt"] = `${PROMPTEXT}`;
                k.gallery = gallery;
                k.model = "dalle";
                k.extent = "1024x1024";
                await upload(k)
            }
        }
        catch (error)
        {
          console.log('There was an error', error);
        }

        return Response.redirect("https://reportbase.com/?sidney=dalle",301);
	},
};


