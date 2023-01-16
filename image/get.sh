#https://reportbase.com/image/HOME.0000/width=1200
#./base.sh HOME.000 webp

curl --request GET --url https://api.cloudflare.com/client/v4/accounts/41f6f507a22c7eec431dbc5e9670c73d/image/v1/$1/blob -H "Authorization: Bearer majjgSB2awSS1-8WJ7OoRvst4gsGjfLl3Fl0kpdC" --header 'Content-Type: application/json' --output $1.$2


























