a=00000000000000000000000000000000
for i in *.jpg ; do
  new=$(printf "%016d.jpg" "$a") #08 pad to length of 8
  mv -- "$i" "$new" 2> tmp
  let a=a+1
done



