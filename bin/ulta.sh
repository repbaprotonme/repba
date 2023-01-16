mkdir orig
convert -crop 3840x1080 002.000.jpg orig/000.0%02d.jpg
convert -crop 3840x1080 002.001.jpg orig/001.0%02d.jpg
convert -crop 3840x1080 002.002.jpg orig/002.0%02d.jpg
convert -crop 3840x1080 002.003.jpg orig/003.0%02d.jpg
convert -crop 3840x1080 002.004.jpg orig/004.0%02d.jpg
convert -crop 3840x1080 002.005.jpg orig/005.0%02d.jpg
convert -crop 3840x1080 002.006.jpg orig/006.0%02d.jpg
convert -crop 3840x1080 002.007.jpg orig/007.0%02d.jpg
convert -crop 3840x1080 002.008.jpg orig/008.0%02d.jpg
convert -crop 3840x1080 002.009.jpg orig/009.0%02d.jpg
convert -crop 3840x1080 002.010.jpg orig/010.0%02d.jpg
convert -crop 3840x1080 002.011.jpg orig/011.0%02d.jpg
cd orig
rename4.sh
cd ..
vkm.sh
