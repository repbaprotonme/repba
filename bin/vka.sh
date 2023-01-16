vkd.sh extent
vkd.sh aspect
F3=012.000.jpg
identify $F3 | gawk '{print "extent="$3}' >> meta.ini
identify $F3 | gawk '{split($3,sizes,"x"); print "aspect="sizes[1]/sizes[2]}' >> meta.ini






