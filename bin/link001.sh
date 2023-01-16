. ../meta.ini
THISIZE=${count}
THISNAME=${name}

printf '[8000]\n' > links.ini  
printf 'Title = %s\n' "$title" >> links.ini
printf 'Fill.Color = rgba(0,0,100,0.7)\n' >> links.ini

COUNT=`expr $count + 1`
printf 'Size = '$COUNT'\n\n' >> links.ini

COUNT=`expr $count - 1`
for i in $(seq 0 $COUNT); do 
    PROJECT=$(printf "%04d" "$i") 
    . ../$PROJECT/meta.ini
    TITLE="${title}"
    printf '[%s]\n' $PROJECT >> links.ini
    printf 'Title = %s\n' "$TITLE" >> links.ini
    printf 'Path = /?p=boss/%s/%s&a=2\n' $THISNAME $PROJECT >> links.ini
done



