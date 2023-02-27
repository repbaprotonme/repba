const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'caf1ce2051msh92cd07b5f6ed3c1p1ba7c2jsnd1d6e9a71548',
		'X-RapidAPI-Host': 'img4me.p.rapidapi.com'
	}
};

fetch('https://img4me.p.rapidapi.com/?text=Test%20Me&font=trebuchet&size=12&fcolor=000000&bcolor=FFFFFF&type=png', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
