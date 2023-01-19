for i in *.webp; 
    do convert $i -quality 80 ${i/.webp/.jpg} 
    rm $i
done

