#for file in *.webp; do convert $file -resize '12000000@>' $file; done
for file in B*.webp; do convert $file -resize '12000000@>' $file; done
