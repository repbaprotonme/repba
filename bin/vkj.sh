for image in *.jpg *.webp; do convert $image -gravity center -crop $1+0+0 $image; done


