for i in *.webp; do
     convert $i -quality 60 ${i/.webp/.jpg}
     convert $i -quality 60 $i
done

