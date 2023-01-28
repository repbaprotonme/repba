export default 
{
	async fetch(request, env, ctx) 
    {
        let url = new URL(request.url);
        let code = url.searchParams.get("code");
        let state = url.searchParams.get("state");
        let client_id = "c59bff919c9d438fa3b579b3a50d5f80"
        let client_secret = "b23943f245a14269a374cf180ad3526b"
      
        async function gatherResponse(response) 
        {
          const { headers } = response;
          const contentType = headers.get('content-type') || '';
          if (contentType.includes('application/json')) {
            return JSON.stringify(await response.json());
          } else if (contentType.includes('application/text')) {
            return response.text();
          } else if (contentType.includes('text/html')) {
            return response.text();
          } else {
            return response.text();
          }
        }

        const response = await fetch('https://accounts.spotify.com/api/token', 
        {
            method: 'POST',
            body: 'redirect_uri=https://reportbase.com/token&code=' + code + '&grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + client_secret,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        
        const results = await response.json();
        var k = JSON.stringify(results);
        var j = 'https://reportbase.com?login=' + k;
        return Response.redirect(j, 301);
        //return new Response(k, { headers: { 'content-type': 'text/html;charset=UTF-8', }, });
	},
};
