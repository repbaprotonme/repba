#golfer
. meta.ini
THISIZE=${count}
PARENT=${parent}
THISNAME=${name}
HOME=${home}

printf '[8000]\n' > html/links.ini  
printf 'Title = %s\n' "$title" >> html/links.ini
printf 'Fill.Color = rgba(0,0,100,0.7)\n' >> html/links.ini
printf 'Path = /?p=boss/%s\n' $PARENT >> html/links.ini

printf 'Home = '$HOME'\n' >> html/links.ini

COUNT=`expr $count + 1`
printf 'Size = '$COUNT'\n\n' >> html/links.ini

COUNT=`expr $count - 1`
for i in $(seq 0 $COUNT); do 
    PROJECT=$(printf "%04d" "$i") 
    . $PROJECT/meta.ini
    A="a=${a}&"
    B="b=${b}&"
    F="f=${f}&"
    S="s=${s}"
    TITLE="${title}"
    printf '[%s]\n' $PROJECT >> html/links.ini
    printf 'Title = %s\n' "$TITLE" >> html/links.ini
    printf 'Path = /?p=boss/%s/%s&k=%s&'$A$B$F$S'\n' $PARENT $THISNAME $PROJECT >> html/links.ini
done



