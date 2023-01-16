for i in *.svg; do
     convert $i -background white -flatten -density 1000 -resize $1 ${i/.svg/.jpg}
done

