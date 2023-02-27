const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/json',
		'X-RapidAPI-Key': 'caf1ce2051msh92cd07b5f6ed3c1p1ba7c2jsnd1d6e9a71548',
		'X-RapidAPI-Host': 'text-to-speech-neural-google.p.rapidapi.com'
	},
	body: '{"audioFormat":"ogg","paragraphChunks":["A detailed analysis of my experience using Open AI’s ChatGPT tool to create code. Intro. ChapGPT sounds too good to be true, so let’s ask it to write some JS code for us. I want to see if it can tackle tasks I do on a daily basis as a front-end dev. Let’s get straight into it and try to break this thing. :). Building a Modal in React. Although it is possible, let’s not start this experiment by adding some code to begin with"],"voiceParams":{"name":"Wavenet-B","engine":"google","languageCode":"en-IN"}}'
};

fetch('https://text-to-speech-neural-google.p.rapidapi.com/generateAudioFiles', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
