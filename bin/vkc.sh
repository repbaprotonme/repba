FOLDER=${PWD##*/}
FOLDER=$(printf "../orig/%s.jpg" $FOLDER)
cp $FOLDER 012.000.jpg
splash.sh 
vkd.sh name
vkn.sh
vkro.sh a 1
vkro.sh z 0
vkro.sh r 50
vkro.sh c 50
vkr.sh count 1


