for i in *.png; do
     convert $i -background white -flatten  ${i/.png/.jpg}
done

