PROJECTNAME=$1

. meta.ini
NAME="${name}"
TITLE="${title}"

TITLE1="${title1}"
if [ -z "$TITLE1" ]
then
    TITLE1=${PROJECTNAME}
fi

TITLE2="${title2}"
if [ -z "$TITLE2" ]
then
    TITLE2=${title}
fi

mkdir -p gif
cd gif

cp ../orig/{0000..0008}.jpg .

for image in *.jpg; do convert $image -sampling-factor 4:2:0 -strip -quality 80 -interlace JPEG -resize x460 -colorspace RGB $image ; done
convert -delay 100 -loop 0 {0000..0008}.jpg 460.gif
convert 460.gif -font DejaVu-Sans-Bold -pointsize 18 -coalesce -gravity South -background white -splice 0x80 -annotate +0+40 "$TITLE" -gravity south -annotate +0+15 "repba.com?$NAME" 460.gif
convert -delay 100 -loop 0 {0000..0000}.jpg 461.gif
convert 461.gif -font DejaVu-Sans-Bold -pointsize 18 -coalesce -gravity South -background white -splice 0x80 -annotate +0+40 "$TITLE" -gravity south -annotate +0+15 "repba.com?$NAME"  461.gif

for image in *.jpg; do convert $image -sampling-factor 4:2:0 -strip -quality 80 -interlace JPEG -resize x420 -colorspace RGB $image ; done
convert -delay 100 -loop 0 {0000..0008}.jpg 420.gif
convert 420.gif -font DejaVu-Sans-Bold -pointsize 18 -coalesce -gravity South -background white -splice 0x110 -annotate +0+40 "$TITLE2" -gravity south -annotate +0+15 "repba.com?$NAME" -annotate +0+70 "$TITLE1" 420.gif
convert -delay 100 -loop 0 {0000..0000}.jpg 421.gif
convert 421.gif -font DejaVu-Sans-Bold -pointsize 18 -coalesce -gravity South -background white -splice 0x110 -annotate +0+40 "$TITLE2" -gravity south -annotate +0+15 "repba.com?$NAME" -annotate +0+70 "$TITLE1" 421.gif

for image in *.jpg; do convert $image -sampling-factor 4:2:0 -strip -quality 80 -interlace JPEG -resize x360 -colorspace RGB $image ; done
convert -delay 100 -loop 0 {0000..0008}.jpg 360.gif
convert 360.gif -font DejaVu-Sans-Bold -pointsize 18 -coalesce -gravity South -background white -splice 0x60 -annotate +0+20 "repba.com?$NAME"  360.gif
convert -delay 100 -loop 0 {0000..0000}.jpg 361.gif
convert 361.gif -font DejaVu-Sans-Bold -pointsize 18 -coalesce -gravity South -background white -splice 0x60 -annotate +0+20 "repba.com?$NAME"  361.gif

for image in *.jpg; do convert $image -sampling-factor 4:2:0 -strip -quality 80 -interlace JPEG -resize x320 -colorspace RGB $image ; done
convert -delay 100 -loop 0 {0000..0008}.jpg 320.gif
convert 320.gif -font DejaVu-Sans-Bold -pointsize 18 -coalesce -gravity South -background white -splice 0x60 -annotate +0+20 "$TITLE2"  320.gif
convert -delay 100 -loop 0 {0000..0000}.jpg 321.gif
convert 321.gif -font DejaVu-Sans-Bold -pointsize 18 -coalesce -gravity South -background white -splice 0x60 -annotate +0+20 "$TITLE2"  321.gif

for image in *.jpg; do convert $image -sampling-factor 4:2:0 -strip -quality 80 -interlace JPEG -resize x240 -colorspace RGB $image ; done
convert -delay 100 -loop 0 {0000..0008}.jpg 240.gif
convert 240.gif -font DejaVu-Sans-Bold -pointsize 18 -coalesce -gravity South -background white -splice 0x60 -annotate +0+20 "$TITLE2"  240.gif
convert -delay 100 -loop 0 {0000..0000}.jpg 241.gif
convert 241.gif -font DejaVu-Sans-Bold -pointsize 18 -coalesce -gravity South -background white -splice 0x60 -annotate +0+20 "$TITLE2"  241.gif

for image in *.jpg; do convert $image -sampling-factor 4:2:0 -strip -quality 80 -interlace JPEG -resize x220 -colorspace RGB $image ; done
convert -delay 100 -loop 0 {0000..0008}.jpg 220.gif
convert -delay 100 -loop 0 {0000..0000}.jpg 221.gif

rm {0000..0008}.jpg
cd ..
