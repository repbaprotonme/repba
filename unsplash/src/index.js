const corsHeaders = origin => ({
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'POST',
  'Access-Control-Allow-Origin': origin
})

const allowedOrigins = 
[
    'https://reportbase.com',
    'https://unsplash.reportbase5836.workers.dev',
    "http://100.115.92.200"
]

const checkOrigin = request => 
{
    const origin = request.headers.get("Origin")
    const foundOrigin = allowedOrigins.find(allowedOrigin => allowedOrigin.includes(origin))
    return foundOrigin ? foundOrigin : allowedOrigins[0]
}

const getImages = async event => 
{
    const { query } = await event.request.json()
    const url = new URL("https://api.unsplash.com/search/photos")
    url.searchParams.set("client_id", "Xfabm2o5F9iUQon5LTX3O249PCsBpviDafSrMVGkaS0")
    url.searchParams.set("per_page", 9)
    url.searchParams.set("query", query)
    const resp = await fetch(url)
    const data = await resp.json()
    const images = data.results.map(image => 
    ({
        id: image.id,
      
        image: image.urls.small,
        link: image.links.html
    }))

    const allowedOrigin = checkOrigin(event.request)

    return new Response(
    JSON.stringify(images),
    { 
        headers: 
        { 
            "Content-type": 'application/json', 
            ...corsHeaders(allowedOrigin), 
        } 
    }
    )
}

export default 
{
	async fetch(request, env, ctx) 
    {
        if (request.method === "OPTIONS")
        {
            const allowedOrigin = checkOrigin(event.request)
            return new Response("OK", {headers: corsHeaders(allowedOrigin)});
        }

        if (event.request.method === "POST") 
            return getImages(event)

        return new Response.redirect("https://reportbase.com", 301)
	}
}
