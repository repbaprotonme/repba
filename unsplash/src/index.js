export default 
{
	async fetch(request, env, ctx) 
    {
        //todo: params
        //todo: console log
        const {query} = await request.json();
        const response = await fetch('https://api.unsplash.com/search/photos?query=${query}', 
        {
            headers:
            {
                Authorization: "Client-ID Xfabm2o5F9iUQon5LTX3O249PCsBpviDafSrMVGkaS0" 
            }
        });

        const data = await response.json();
        const images = data.results.map(image => (
        {
            id: image.id,
            image: image.urls.small,
            link: image.links.html,
        }));

        return new Response(JSON.stringify(images),
        {
            headers:
            {
                'Content-type': 'application/json'
            }
        });
	},
};
