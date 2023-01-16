#../bin/./rename16.sh
#../bin/./rename4.sh
#../bin/./resize.sh x2160

#mkdir TMP
#export MAGICK_TMPDIR=TMP
magick -size 1405x2160 xc:white 0022.jpg
magick -size 1405x2160 xc:white 0023.jpg
convert {0000..0005}.jpg -append THOR.0008.jpg
convert {0006..0011}.jpg -append THOR.0009.jpg
convert {0012..0017}.jpg -append THOR.0010.jpg
convert {0018..0023}.jpg -append THOR.0011.jpg
