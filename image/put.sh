#./put.sh HOME.0000 jpg

IMAGE=$(printf "file=@./test.webp" "")
POST=$(printf "https://api.cloudflare.com/client/v4/accounts/%s/image/v1" "41f6f507a22c7eec431dbc5e9670c73d")
HEADER=$(printf "Authorization: Bearer %s" "hXCWi4iJ8wDztj3LUWqzqXyqjgPCmPypnr5Rjkjb")
curl --request POST $POST  --header "$HEADER" --form $IMAGE --form 'metadata={"key":"value","width":"100","email":"reportbase@gmail.com"}'

























