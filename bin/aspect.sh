identify $1 2> error | \
gawk '{split($3,sizes,"x"); print $1,sizes[1],sizes[2],sizes[1]*sizes[2],sizes[1]/sizes[2]}' | \
sed 's/\[.\]//' | sort -gk 4 | \
sort -k4,4nr 


