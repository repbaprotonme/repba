export default
{
  async fetch(request)
  {
      const formData = await request.formData();
    const body = {};
    for (const entry of formData.entries())
      body[entry[0]] = entry[1];
    var promptxt = body["prompt"];

   let res = await fetch('https://dalle.reportbase5836.workers.dev',
   {
         method: 'POST',
         body: `${promptxt}`,
         headers: { "Content-Type": "text/plain" }
   });

    var json = await res.json();
    for (var n = 0; n < json.length; n++)
    {
        json[n].id = id;
    }

    return new Response("hello", {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        "content-type": "application/json",
      },
    });
  },
};


