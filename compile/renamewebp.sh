a=0
for i in *.webp ; do
  new=$(printf "PANO.%04d.webp" "$a")
 echo $new 
  mv -- "$i" "$new" 
  let a=a+1
done



