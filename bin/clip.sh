for image in *.jpg; do convert $image -gravity center -crop $1+0+0 $image; done


