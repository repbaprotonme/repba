identify *.jpg *.webp *.avif 2> error | gawk '{split($3,sizes,"x"); print "[\""$1"\",", sizes[1]",", sizes[2]"],"}' 


