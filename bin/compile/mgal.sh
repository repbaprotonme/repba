echo "{"

echo "     \"template\": \"$1\"," 
echo "     \"title\": \"$2\","
echo "     \"data\":"
echo "     ["

for f in "$@"
do
    
    identify $f 2> error | gawk '{split($1,name,"."); split($3,sizes,"x"); print "          [\""name[1]"."name[2]"\",", sizes[1]",", sizes[2]"],"}' 

done

echo "     ]"
echo "}"





#


