#pbase center/north/south

for NAME in *.jpg; do
STR=$(identify -format '%[basename]' $NAME)
STR=$(echo $STR 1 | awk '{print $1 + $2}')
convert -background black -bordercolor black -fill white \
   -pointsize 80 -font  MADEOuterSans-Black -gravity $1 caption:$STR              \
   -trim -border 10 -channel A -fx '(lightness/3)+.25'    \
   -gravity $1 $NAME +swap -geometry +0+0 -composite $NAME
done

#mogrify -set comment "comment" 0000.jpg #%[comment]
#https://stackoverflow.com/questions/32108623/image-magick-padding-font
