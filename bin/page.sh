#./page.sh HOME.0015 reportbase.com repba@proton.me

NAME=$(printf 'https://repba.com?%s' "mona")
NAME=${NAME,,} 
#FONT="/usr/share/fonts/TTF/Anonymous Pro Minus B.ttf"
FONT="/usr/share/fonts/adobe-source-sans/SourceSansPro-Bold.otf"
CAPTION="reportbase.com\nInteractive Panoramas\nHigh-resolution Image Viewer\nTopographic maps, drone and satellite photos, maps, photography, digital art, panoramas, comics, graphic novels, portraits, landscapes, cityscapes, infographics, real estate, automobiles, and vintage paintings.\nhttps://reportbase.com\ninfo@reportbase.com"
cp $1 $1.webp

#convert $1.webp  \( ASPO.0001.webp -resize 1200x  \) -gravity center -geometry +1200-2800 -composite $1.webp
#convert $1.webp  \( GOLF.0000.webp -resize 1200x  \) -gravity center -geometry +0-3000 -composite $1.webp
#convert $1.webp  \( PUMP.0001.webp -resize 1200x  \) -gravity center -geometry -1200-2400 -composite $1.webp
#convert $1.webp  \( MADM.0001.webp -resize 1200x  \) -gravity center -geometry -600+2400 -composite $1.webp
#convert $1.webp  \( MADM.0002.webp -resize 1200x  \) -gravity center -geometry -600-2400 -composite $1.webp
#convert $1.webp  \( HOPE.0005.webp -resize 1200x  \) -gravity center -geometry -400-1800 -composite $1.webp
#convert $1.webp  \( GIMP.0002.webp -resize 1200x  \) -gravity center -geometry +600-2400 -composite $1.webp
#convert $1.webp  \( BIRD.0002.webp -resize 1000x  \) -gravity center -geometry +1200-2000 -composite $1.webp
#convert $1.webp  \( CITY.0000.webp -resize 1200x  \) -gravity center -geometry +1200-1200 -composite $1.webp
#convert $1.webp  \( BIRD.0000.webp -resize 1200x  \) -gravity center -geometry +0-1000 -composite $1.webp
#convert $1.webp  \( DOLL.0000.webp -resize 1200x  \) -gravity center -geometry -1200-800 -composite $1.webp
#convert $1.webp  \( BOAT.0008.webp -resize 800x  \) -gravity center -geometry +900-900 -composite $1.webp
#convert $1.webp  \( MADM.0000.webp -resize 1800x  \) -gravity center -geometry +1200+0 -composite $1.webp
#convert $1.webp  \( GOAT.0001.webp -resize 1200x  \) -gravity center -geometry -400-400 -composite $1.webp
#convert $1.webp  \( HOPE.0000.webp -resize 1800x  \) -gravity center -geometry -1200+0 -composite $1.webp
#convert $1.webp  \( HOOD.0000.webp -resize 1200x  \) -gravity center -geometry +1000+1200 -composite $1.webp
#convert $1.webp  \( GIMP.0000.webp -resize 1200x  \) -gravity center -geometry +600+1100 -composite $1.webp
#convert $1.webp  \( DAME.0000.webp -resize 1200x  \) -gravity center -geometry +200+1700 -composite $1.webp
#convert $1.webp  \( BALL.0000.webp -resize 1200x  \) -gravity center -geometry -1200+1200 -composite $1.webp
#convert $1.webp  \( RAIN.0000.webp -resize 1200x  \) -gravity center -geometry -400+1500 -composite $1.webp
#convert $1.webp  \( BOAT.0000.webp -resize 1200x  \) -gravity center -geometry -300+900 -composite $1.webp

convert $1.webp -font "$FONT" -size 1000x -background Black -fill White -geometry +0+20 -pointsize 80 -gravity Center caption:$2  +swap -gravity Center -append $1.webp
convert $1.webp -font "$FONT" -size 1000x -background none -fill White -geometry +0+20 -pointsize 80 -gravity NorthWest label:$2  +swap -gravity NorthWest -append $1.webp

#convert $1.webp -font "$FONT" -size 1000x -background Black -fill white -geometry +0+20 -pointsize 80 -gravity Center caption:$3  -gravity Center -append $1.webp
#convert $1.webp  \( ../res/touch.png -channel RGB -negate -resize 400x  \) -gravity southwest -geometry +300+250 -composite $1.webp
#convert $1.webp  \( ../res/devices.png -channel RGB -negate -resize 500x  \) -gravity southeast -geometry +300+300 -composite $1.webp


