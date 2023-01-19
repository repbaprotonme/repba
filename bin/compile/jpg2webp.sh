for i in *.jpg; 
    do convert $i -quality 80 ${i/.jpg/.webp} 
    rm $i
done

