#./makemenu AGEN
#
#./avif2jpg.sh
#./webp2jpg.sh
for image in *.jpg; do convert $image -resize x1200 $image; done
#for image in *.webp; do convert $image -resize 382x560^ -gravity north -extent 382x560 $image; done 
#for image in *.webp; do convert $image -resize 382x560^ -gravity north -extent 382x560 $image; done 
#convert $1.*.jpg -append $1.jpg


