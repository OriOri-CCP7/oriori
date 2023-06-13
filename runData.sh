#!/usr/bin/env bash
filenames=(001_Locations 002_Users 003_Stores 004_Products 005_Favorites )
skipindices=( 1 4 )

for (( i=0; i<${#filenames[@]}; i++ ));
# python3 manage.py loaddata 00X_Filename.json
# python3 manage.py loaddata 001_Locations.json 
# python3 manage.py loaddata 003_Stores.json
# python3 manage.py loaddata 004_Products.json
do 
    if [[ " ${skipindices[@]} " =~ " $i " ]]; 
    then
        continue
    fi
    python3 manage.py loaddata ${filenames[$i]}.json
done