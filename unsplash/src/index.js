export default 
{
	async fetch(request, env, ctx) 
    {
        const response = await fetch("https://api.unsplash.com/photos", 
        {
            headers:
            {
                Authorization: "Client-ID Xfabm2o5F9iUQon5LTX3O249PCsBpviDafSrMVGkaS0" 
            }
        });

        const data = await response.json();
        return new Response(JSON.stringify(data),
        {
            headers:
            {
                'Content-type': 'application/json'
            }
        });
	},
};
