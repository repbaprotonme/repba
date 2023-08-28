#identify $1 2> error | \
#gawk '{split($3,sizes,"x"); print $1,sizes[1],sizes[2],sizes[1]*sizes[2],sizes[1]/sizes[2]}' | \
#sed 's/\[.\]//' | sort -gk 4 | \
#sort -k4,4nr 

find . \( -iname  "*png" -o -iname "*jpg" -o -iname "*gif" -o -iname "*webp" -o -iname "*avif"  -o -iname "*aviv" \) -exec identify {} \; |\
perl -ne '/(.+?)\s+[A-Z]{3}\s+(\d+)x(\d+)/; print "$1 ", $2/$3, "\n"' | \
sort -gk 2


