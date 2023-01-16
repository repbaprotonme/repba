for i in *.jpg; do
     convert $i -quality 85 ${i/.jpg/.webp}
done


