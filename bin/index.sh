. meta.ini
NAME=${PWD##*/}

COUNT=`expr $count - 1`
printf "" > html/index.out
for i in $(seq 0 $COUNT); do 
    ID=$(printf "%04d" "$i") 
    printf '<iframe src=/?p=boss/%s&k=%s&e=0&a=3&y=1 height=240 width=100%%></iframe><br>\n' $NAME $ID >> html/index.out
done

sed 's/{DESCRIBE}/$x/g' /srv/http/data/bin/index.res | x="$(<html/index.out)" envsubst '$x' > html/index.html
