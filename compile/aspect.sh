identify *.webp *.jpg *.avif 2> error | \
gawk '{split($3,sizes,"x"); print $1,sizes[1],sizes[2],sizes[1]*sizes[2],sizes[1]/sizes[2]}' | \
sed 's/\[.\]//' | sort -gk 5 | \
sort -k5,5nr 


