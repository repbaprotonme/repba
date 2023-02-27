const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'caf1ce2051msh92cd07b5f6ed3c1p1ba7c2jsnd1d6e9a71548',
		'X-RapidAPI-Host': 'unsplash-data.p.rapidapi.com'
	}
};

fetch('https://unsplash-data.p.rapidapi.com/search/collections?query=cars&per_page=20&page=1', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
