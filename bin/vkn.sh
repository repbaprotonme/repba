#NAME=$(grep -i "name=" meta.ini)

#if [ -z "$NAME" ] 
#then
    RNAME=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 4 | head -n 1)
    RNAME=${RNAME^^}
    vkr.sh name $RNAME

    touch meta.ini
    rm 009.000.jpg 2> /dev/null
    rm 008.000.jpg 2> /dev/null
    rm splash.jpg 2> /dev/null
    convert 012.000.jpg -resize x2160 009.000.jpg
    convert 009.000.jpg -resize x1440 008.000.jpg
   ln -s 008.000.jpg splash.jpg
#fi







