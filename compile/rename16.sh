#rename 4000
a=$1
for i in *.jpg  ; do
  new=$(printf "%016d.webp" "$a") 
  mv -- "$i" "$new" 
  let a=a+1
done



