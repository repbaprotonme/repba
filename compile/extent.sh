#extent.sh 1000x1000
#for image in *.jpg; do convert $image -resize 280x280^ -gravity center -extent 280x280 $image; done 
#for image in *.jpg; do convert $image -resize 280x280^ -gravity north -extent 280x280 $image; done 
for image in *.jpg; do convert $image -resize 280x280^ -gravity north -extent 280x280 $image; done 

#for image in *.webp; do convert $image -resize $1 -background white -compose Copy -gravity center -extent $1 -quality 90 $image; done
