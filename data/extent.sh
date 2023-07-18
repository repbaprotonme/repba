#extent.sh 1000x1000
#for image in *.webp; do convert $image -resize 550x1440^ -gravity center -extent 550x1440 $image; done 
#for image in *.webp; do convert $image -resize 1080x608^ -gravity center -extent 1080x608 $image; done 
for image in *.webp *.jpg; do convert $image -resize 360x360^ -gravity center -extent 360x360 $image; done 

#for image in *.webp; do convert $image -resize $1 -background white -compose Copy -gravity center -extent $1 -quality 90 $image; done
