. meta.ini
THISIZE=${count}
THISNAME=${name}
THISPARENT=${paren}
a=${a}

printf '[8000]\n' > html/links.ini  
printf 'Title = %s\n' "$title" >> html/links.ini
printf 'Fill.Color = rgba(0,0,100,0.7)\n' >> html/links.ini

COUNT=`expr $count + 1`
printf 'Size = '$COUNT'\n\n' >> html/links.ini

COUNT=`expr $count - 1`
for i in $(seq 0 $COUNT); do 
    PROJECT=$(printf "%04d" "$i") 
    . $PROJECT/meta.ini
    TITLE="${title}"
    printf '[%s]\n' $PROJECT >> html/links.ini
    printf 'Title = %s\n' "$TITLE" >> html/links.ini
    printf 'Path = /?p=boss/%s/%s&k=0000&a=%s\n' $THISPARENT $THISNAME $PROJECT $a >> html/links.ini
done



