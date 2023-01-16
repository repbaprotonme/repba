#mvname.sh 3 1
for n in {0..71}; do 
    old=$(printf "%03d.%03d.jpg" $1 $n) 
    new=$(printf "%03d.%03d.jpg" $2 $n) 
    mv $old $new 2> /dev/null
done


