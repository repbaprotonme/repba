input="quotes.txt"
N0=0
while line= read -r line
do
  STR=$(printf "%04d.jpg" "$NO") 
  mogrify -set comment "$line" $STR
  echo "$line $STR"
  NO=$(($NO+1))
done < "$input"

