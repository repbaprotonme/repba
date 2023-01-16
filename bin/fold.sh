source <(grep count meta.ini)
COUNT=${count}
COUNT=`expr $count - 1`

for ((i=0;i<=$COUNT;i++)); do
    FOLDER=$(printf "%04d" "$i")
    mkdir -p $FOLDER
    ORIG=$(printf "%04d.jpg" "$i")
    DEST=$(printf "%s/012.000.jpg" "$FOLDER")
    mv $ORIG $DEST 2>/dev/null 
    DEST=$(printf "%s/meta.ini" "$FOLDER")
    touch $DEST
    cd $FOLDER
    vkn.sh
    vka.sh
    cd ..
done
