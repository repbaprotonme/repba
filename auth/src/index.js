export default 
{
	async fetch(request, env, ctx) 
    {
        const url = "https://accounts.spotify.com/authorize?response_type=code&client_id=c59bff919c9d438fa3b579b3a50d5f80&scope=user-read-currently-playing&redirect_uri=https://reportbase.com/spotify&state=3asfe34f";
        return Response.redirect(url, 301);
	},
};

