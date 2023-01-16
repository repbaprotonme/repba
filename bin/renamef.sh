a=0
for i in *.jpg ; do
  new=$(printf "MANH.%04d.jpg" "$a")
 echo $new 
  mv -- "$i" "$new" 
  let a=a+1
done



