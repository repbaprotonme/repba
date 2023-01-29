export default 
{
	async fetch(request, env, ctx) 
    {
        let url = new URL(request.url);
        let code = url.searchParams.get("code");
        let state = url.searchParams.get("state");
        let client_id = "c59bff919c9d438fa3b579b3a50d5f80"
        let client_secret = "b23943f245a14269a374cf180ad3526b"
      
        const response = await fetch('https://accounts.spotify.com/api/token', 
        {
            method: 'POST',
            //body: 'redirect_uri=https://reportbase.com/spotify&code=' + code + '&grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + client_secret,
            body: 'redirect_uri=https://reportbase.com/spotify&code=' + code + '&grant_type=authorization_codes&client_id=' + client_id + '&client_secret=' + client_secret,
            headers: 
            { 
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorizaion': 'Basic ' + btoa(client_id + ':' + client_secret) 
            }
        });
        
        const results = await response.json();
        var k = JSON.stringify(results);
//        var j = 'https://reportbase.com?spotify=' + k;
        //return Response.redirect(j, 301);
        return new Response(k, { headers: { 'content-type': 'text/html;charset=UTF-8', }, });
	},
};
