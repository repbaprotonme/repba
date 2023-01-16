NAME=$(printf 'https://repba.com?%s' "mona")
NAME=${NAME,,} 
FONT="/usr/share/fonts/TTF/Anonymous Pro Minus B.ttf"
CAPTION="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget eros nisl. Pellentesque et dui ac urna commodo elementum. Pellentesque at enim eget magna rhoncus iaculis a eget velit. Phasellus tincidunt ligula tempus nibh consequat, quis vulputate est blandit. Nullam imperdiet odio lectus, sit amet ultrices massa vestibulum vel. Nullam placerat magna non feugiat aliquam. Sed nibh lorem, finibus sed cursus at, faucibus in metus. Nullam elementum convallis quam nec ultricies. Nullam commodo orci nec diam bibendum, id placerat urna volutpat. Vivamus at nulla consequat, commodo lectus quis, sagittis odio."

cp ../data/BIRD.0000.webp botext.webp
convert botext.webp -gravity south -units PixelsPerInch -density 300 -font "$FONT" -undercolor black -fill white -pointsize 18 -annotate +0+20 "This Is Some Text" botext.webp

