rm *.jpg
cp ../data/$1.0*.jpg .
#./webp2jpg.sh 
./resize.sh 
./extent.sh 
./join7.sh
mv DRAC.jpg ../data/$1.jpg
echo $1



