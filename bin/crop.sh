#left,top      right,bottom
convert test.jpg -crop +180+140 -crop -60-140 cropped.jpg
convert girls.jpg -crop +0+4 -crop -0-0 girls2.jpg

convert text.jpg -gravity north -chop 0x180 -gravity east -chop 60x0 -gravity south -chop 0x140 -gravity west -chop 140x0 cropped.jpg

for image in *.jpg; do convert $image -gravity center -shave 400x0 $(basename -- "$image") ; done

for image in *.jpg; do convert $image -gravity center -crop 420x280+0+0 $image; done

convert -crop "%[fx:w-(180+60)]"x"%[fx:h-(140+140)]"+180+140 result
