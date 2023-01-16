#for file in *.jpeg; do convert $file -resize '12000000@>' $file; done
#for file in *.avif; do convert $file -resize   '12000000@>' $file; done
for file in *.avif; do convert $file -resize   '9000000@>' $file; done
#for file in *.webp; do convert $file -resize 1440x $file; done
