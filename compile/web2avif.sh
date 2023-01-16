for i in *.webp; 
    do convert $i -quality 80 ${i/.webp/.avif} 
    rm $i
done

