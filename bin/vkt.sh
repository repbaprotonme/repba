FOLDER=${PWD##*/}  #0000
PARENT=`basename ${PWD%/*}`
cp splash.jpg ../../$PARENT/html/splash/$FOLDER.jpg 

