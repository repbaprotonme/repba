#find * -type f > files
node args.js ../data/starwars/files | jq > ../data/starwars/starwars.json
