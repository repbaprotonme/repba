if [ ! -f "describe.txt" ]; then
    touch "describe.txt"
fi

if [ ! -f "meta.ini" ]; then
    touch "meta.ini"
fi

rm -r -f *.out error TMP
cp meta.ini .meta.ini


