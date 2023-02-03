node get.js $1
node print.js $1 | jq > $1 
./put.sh $1 
cp $1 old/$1
























