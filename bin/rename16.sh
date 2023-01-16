#rename 4000
a=$1
for i in *.webp ; do
  new=$(printf "%016d.webp" "$a") #08 pad to length of 8
  mv -- "$i" "$new" 2> tmp
  let a=a+1
done



