const args = process.argv.slice(2);
fetch("https://reportbase.com/gallery/"+args[0])
    .then((response) => response.json())
    .then((data) => console.log(data));
