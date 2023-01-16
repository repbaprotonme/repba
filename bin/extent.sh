#extent.sh 1000x1000
for image in WAR.0005.webp; do convert $image -resize 1920x1080^ -gravity center -extent 1920x1080 $image; done 

#for image in *.webp; do convert $image -resize $1 -background white -compose Copy -gravity center -extent $1 -quality 90 $image; done
