. meta.ini
PROJECTITLE=${title}
PROJECTNAME=${name}
PROJECTCOUNT=${count}
PARENTNAME=${parent}
a=${a}

rm html/div.out 2> /dev/null 
COUNT=`expr $count - 1`
for i in $(seq 0 $COUNT); do 
    NAME=$(printf "%04d" "$i") 
    cat $NAME/div.out  >> html/div.out 2> /dev/null 
done

sed 's/{DESCRIBE}/$x/g' /srv/http/data/bin/home.res | x="$(<html/div.out)" envsubst '$x' > html/home.html
sed -i s/{PARENTNAME}/${PARENTNAME}/ html/home.html 2> /dev/null
sed -i s/{PROJECTNAME}/${PROJECTNAME}/ html/home.html 2> /dev/null
sed -i "s/{PROJECTITLE}/${PROJECTITLE}/" html/home.html 2> /dev/null
sed -i "s/{a}/${a}/" html/home.html 2> /dev/null

