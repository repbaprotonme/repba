mkdir TMP
export MAGICK_TMPDIR=TMP
convert {0000..0004}.jpg +append WALD.0000.jpg
convert {0005..0009}.jpg +append WALD.0001.jpg
convert {0010..0014}.jpg +append WALD.0002.jpg
