for i in *.webp; do
  new=$(printf "%04d.webp" "$a") 
  mv -- "$i" "$new" 
  let a=a+1
done



