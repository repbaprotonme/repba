const args = process.argv.slice(2);
fetch("https://reportbase.com/gallery/"+args[0], { method: "DELETE" })
