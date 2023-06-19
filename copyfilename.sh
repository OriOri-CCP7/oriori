#!/bin/bash

# Define the source and destination folders
src_folder="./client/src/pages"
dst_folder="./client/src/styles"

# Loop through all files in the source folder
for file in "$src_folder"/*; do
    # Extract the filename (without extension) from the file path
    filename=$(basename "$file" .tsx)

    # Create the destination file path with the new extension
    dst_file="$dst_folder/$filename.css"

    # Create the new file with the same filename but different extension
    touch "$dst_file"
done

