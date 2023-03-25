export default
{
  async fetch(request)
  {
    const formData = await request.formData();
    const body = {};
    for (const entry of formData.entries())
      body[entry[0]] = entry[1];

   let response = await fetch('https://dalle.reportbase5836.workers.dev',
   {
         method: 'POST',
         body: "glad hands",
         headers: { "Content-Type": "text/plain" }
   });

      return new Response(JSON.stringify(body));
  },
};


