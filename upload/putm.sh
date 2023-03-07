#./put.sh HOME

IMAGE=$(printf "file=@./$1" "$i")
POST=$(printf "https://api.cloudflare.com/client/v4/accounts/%s/images/v1" "41f6f507a22c7eec431dbc5e9670c73d")
HEADER=$(printf "Authorization: Bearer %s" "y0wMwbTTYZkJG9IDm3EngHYrnsdEqfaUPgc6J38R")
curl --request POST $POST  --header "$HEADER" --form $IMAGE --form 'metadata={"key":"value","owner":"reportbse@gmail.com","width":500,"height":400}'

























