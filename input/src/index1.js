export default
{
  async fetch(request)
  {
    async function readRequestBody(request)
    {
      const contentType = request.headers.get("content-type");
      if (contentType.includes("application/json"))
        return JSON.stringify(await request.json());
      else if (contentType.includes("application/text"))
        return request.text();
      else if (contentType.includes("text/html"))
        return request.text();
      else if (contentType.includes("form"))
      {
        const formData = await request.formData();
        const body = {};
        for (const entry of formData.entries())
          body[entry[0]] = entry[1];
        return JSON.stringify(body);
      }
      else
      {
        return "a file";
      }
    }

    const { url } = request;
    if (url.includes("form"))
      return new Response(html, { headers: { "content-type": "text/html;charset=UTF-8", }, });

     if (request.method === "POST")
     {
      const reqBody = await readRequestBody(request);
      const retBody = `The request body sent in was ${reqBody}`;
      return new Response(retBody);
     }
     else if (request.method === "GET")
     {
      return new Response("The request was a GET");
     }

  },
};


