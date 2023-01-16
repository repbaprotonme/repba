NAME=$(printf 'https://repba.com?%s' "mona")
NAME=${NAME,,} 
FONT="/usr/share/fonts/TTF/Anonymous Pro Minus B.ttf"
CAPTION="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget eros nisl. Pellentesque et dui ac urna commodo elementum. Pellentesque at enim eget magna rhoncus iaculis a eget velit. Phasellus tincidunt ligula tempus nibh consequat, quis vulputate est blandit. Nullam imperdiet odio lectus, sit amet ultrices massa vestibulum vel. Nullam placerat magna non feugiat aliquam. Sed nibh lorem, finibus sed cursus at, faucibus in metus. Nullam elementum convallis quam nec ultricies. Nullam commodo orci nec diam bibendum, id placerat urna volutpat. Vivamus at nulla consequat, commodo lectus quis, sagittis odio."

#add text to left side
cp DMZ.0007.BACK.webp DMZ.0007.webp
for K in DMZ.0007.webp ; do
convert -background black -bordercolor black -fill white -pointsize 100 -font "$FONT" -gravity west caption:$NAME -trim -border 20 -rotate -90 -channel A -fx '(lightness/3)+0.3' -gravity west $K +swap -geometry +0+40 -composite $K  
done

#Auto sized caption
cp DMZ.0015.BACK.webp DMZ.0015.webp
width=`identify -format %w DMZ.0015.webp`
convert -background '#0008' -fill white -gravity center -font "$FONT" -units PixelsPerInch -density 150  -size $((width/2)) "caption:${CAPTION}" DMZ.0015.webp +swap -gravity center -composite  DMZ.0015.webp

#long text
cp DMZ.0014.BACK.webp DMZ.0014.webp
#convert DMZ.0014.webp -font "$FONT" -background Khaki  -pointsize 30 -gravity Center  caption:'The Apollo Rocket Launch- A Mission Accomplished'  +swap -gravity Center -append DMZ.0014.webp
convert DMZ.0014.webp -font "$FONT" -size 530x -background Khaki  -units PixelsPerInch -density 300  -gravity Center caption:'The Apollo Rocket Launch- A Mission Accomplished'  +swap -gravity Center -append DMZ.0014.webp
convert DMZ.0014.webp -font "$FONT" -size 530x -background Khaki  -units PixelsPerInch -density 300  -gravity Center caption:'The Apollo Rocket Launch- A Mission Accomplished'  -gravity Center -append DMZ.0014.webp

#add text to bottom
cp HOME.0015.BACK.webp HOME.0015.webp
convert HOME.0015.webp -font "$FONT" -size 3500x -background White  -pointsize 180 -gravity Center caption:'The Apollo Rocket Launch- A Mission Accomplished'  +swap -gravity Center -append HOME.0015.webp
convert HOME.0015.webp -font "$FONT" -size 3500x -background White  -pointsize 180 -gravity Center caption:'The Apollo Rocket Launch- A Mission Accomplished'  -gravity Center -append HOME.0015.webp
convert HOME.0015.webp  \( ../res/360.png -resize 1200x  \) -gravity northwest -geometry +100+10 -composite HOME.0015.webp

#add text box
cp DMZ.0009.BACK.webp DMZ.0009.webp
convert DMZ.0009.webp -size 300x300! -background green -pointsize 100 -font "$FONT" -gravity center caption:$NAME -gravity northwest -geometry +312+66 -composite DMZ.0009.webp

#add text box
cp DMZ.0010.BACK.webp DMZ.0010.webp
convert DMZ.0010.webp -size 173x100! -pointsize 100 -font "$FONT" -background yellow caption:"Your text" -geometry +312+66 -composite DMZ.0010.webp

#add text box
cp DMZ.0011.BACK.webp DMZ.0011.webp
convert DMZ.0011.webp -size 173x150! -font "$FONT" -background yellow caption:"A considerably longer text that will result in a smaller font being chosen" -geometry +312+66 -composite DMZ.0011.webp

#add text box
cp DMZ.0012.BACK.webp DMZ.0012.webp
convert DMZ.0012.webp \( -size 173x50 -font "$FONT" -background yellow label:"A" -trim -gravity center -extent 173x50 \) -gravity northwest -geometry +312+66 -composite DMZ.0012.webp

#box on bottom
cp DMZ.0013.BACK.webp DMZ.0013.webp
convert DMZ.0013.webp -gravity south -units PixelsPerInch -density 300 -font "$FONT" -undercolor black -fill white -pointsize 18 -annotate +0+20 "This Is Some Text" DMZ.0013.webp

