const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'caf1ce2051msh92cd07b5f6ed3c1p1ba7c2jsnd1d6e9a71548',
		'X-RapidAPI-Host': 'tunein1.p.rapidapi.com'
	}
};

fetch('https://tunein1.p.rapidapi.com/tunein.com/s26700/', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
