for i in *.avif; 
    do convert $i -quality 80 ${i/.avif/.jpg} 
    rm $i
done

