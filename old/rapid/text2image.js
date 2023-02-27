const encodedParams = new URLSearchParams();
encodedParams.append("upscale", "1");
encodedParams.append("steps", "30");
encodedParams.append("sampler", "dpm");
encodedParams.append("prompt", "an astronaut riding a horse, digital art, epic lighting, highly-detailed masterpiece trending HQ");
encodedParams.append("model", "stablediffusion_1_5");
encodedParams.append("guidance", "8");

const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Key': 'caf1ce2051msh92cd07b5f6ed3c1p1ba7c2jsnd1d6e9a71548',
		'X-RapidAPI-Host': 'dezgo.p.rapidapi.com'
	},
	body: encodedParams
};

fetch('https://dezgo.p.rapidapi.com/text2image', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
