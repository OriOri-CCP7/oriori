#!/usr/bin/env bash
filenames=(Locations Users Stores Products Favorites )
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
    python3 manage.py loaddata 00${i}_${filenames[$i]}.json
done