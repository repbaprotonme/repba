for i in *.png; do
  new=$(printf "%04d.jpg" "$a") 
  mv -- "$i" "$new" 2> error
  let a=a+1
done



