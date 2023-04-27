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

    for (var n = 0; n < json.data.length; n++)
    {
        var id = await upload(json.data[n])
        json.data[n].id = id;
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


