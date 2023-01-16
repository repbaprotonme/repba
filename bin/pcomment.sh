#pcomment

for NAME in *.jpg ; do
#mogrify -set comment "The Harder You Work, The Luckier You Get" $NAME
STR=$(identify -format '%c' $NAME)
#echo $STR
convert -background black -bordercolor black -fill white \
   -size 400x400 -font Canted-Comic-Bold -gravity center caption:"$STR"              \
   -trim -border 20 -channel A -fx '(lightness/2)+.5'    \
   -gravity center $NAME +swap -composite $NAME
done


#Cherry-Cream-Soda-Regular  #fancy minimal
#Chango-Regular    #comic bulge
#Canted-Comic-Bold #comic minimal
#Cantarell-Bold   #basic
#Adore-You
#American-Dream   #American Flag
#Angels-Regular   #large shaded 
#Aquawax-Black    #basic
#Baby-Panda       #cursive
#BD-Cartoon-Shout #cartoon  *
#Bebas            #tall thin
#Bowlby-One-SC-Regular #caps large
#Cabin-Bold       #basic
