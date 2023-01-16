NAME=$(printf 'https://repba.com?%s' "mona")
NAME=${NAME,,} 
FONT="/usr/share/fonts/TTF/Anonymous Pro Minus B.ttf"
CAPTION="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget eros nisl. Pellentesque et dui ac urna commodo elementum. Pellentesque at enim eget magna rhoncus iaculis a eget velit. Phasellus tincidunt ligula tempus nibh consequat, quis vulputate est blandit. Nullam imperdiet odio lectus, sit amet ultrices massa vestibulum vel. Nullam placerat magna non feugiat aliquam. Sed nibh lorem, finibus sed cursus at, faucibus in metus. Nullam elementum convallis quam nec ultricies. Nullam commodo orci nec diam bibendum, id placerat urna volutpat. Vivamus at nulla consequat, commodo lectus quis, sagittis odio."

#add text to left side
cp ../data/BIRD.0000.webp vertext.webp
for K in vertext.webp ; do
convert -background black -bordercolor black -fill white -pointsize 100 -font "$FONT" -gravity west caption:$NAME -trim -border 20 -rotate -90 -channel A -fx '(lightness/3)+0.3' -gravity west $K +swap -geometry +0+40 -composite $K  
done


