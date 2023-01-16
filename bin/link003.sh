. meta.ini
THISIZE=${count}
THISNAME=${name}

printf '[8000]\n' > html/links.ini  
printf 'Title = %s\n' "$title" >> html/links.ini
printf 'Fill.Color = rgba(0,0,100,0.7)\n' >> html/links.ini
printf 'Path = INDEXHTML\n' >> html/links.ini

COUNT=`expr $count + 1`
printf 'Size = '$COUNT'\n\n' >> html/links.ini

COUNT=`expr $count - 1`
for i in $(seq 0 $COUNT); do 
    PROJECT=$(printf "%04d" "$i") 
    . $PROJECT/meta.ini
    TITLE="${title}"
    a=${a}
    f=${f}
    s=${s}
    z=${z}
    c=${c}
    printf '[%s]\n' $PROJECT >> html/links.ini
    printf 'Title = %s\n' "$TITLE" >> html/links.ini
    printf 'Path = /?p=boss/%s&k=%s&a=%s&s=%s&f=%s&c=%s&z=%s\n' $THISNAME $PROJECT $a $s $f $c $z >> html/links.ini
done



