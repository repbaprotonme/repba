#resize.sh x1080
#https://www.smashingmagazine.com/2015/06/efficient-image-resizing-with-imagemagick/
#https://imagemagick.org/script/mogrify.php

#for image in *.jpg; do convert $image -sampling-factor 4:2:0 -strip -quality 80 -interlace JPEG -colorspace RGB $image ; done

#for image in B*LD*.webp; do convert $image -quality 80 $image; done
for image in ARMY.*.webp; do convert $image -resize 1440x $image; done
#for image in *.webp; do convert $image -quality 80 $image; done
#for image in *.jpg; do convert $image -quality 85 $image; done

#convert tall.0004.jpg -quality 80 a.jpg

#resize.sh a.jpg x2160
#mogrify -filter Triangle -define filter:support=2 -thumbnail $2 -unsharp 0.25x0.08+8.3+0.045 -dither None -posterize 136 -quality 82 -define jpeg:fancy-upsampling=off -interlace none -colorspace sRGB $1

