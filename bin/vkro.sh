#for a=1

sed -i '/'$1='/Id' meta.ini
printf '%s=%s\n' $1 $2 >> meta.ini

