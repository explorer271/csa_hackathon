# Path to the file containing paths to the text files (list2.txt)
import os
list2_file = 'list2.txt'

# Output file where merged content will be saved
output_file = 'merged_output.txt'

# Read the list of text file paths from list2.txt
try:
    with open(list2_file, 'r') as file:
        text_files = file.read().splitlines()
except FileNotFoundError:
    print(f"Error: {list2_file} not found!")
    exit(1)

# Merge content of all text files listed in list2.txt
with open(output_file, 'w') as outfile:
    for txt_path in text_files:
        # Check if the current file path exists and is not empty
        if os.path.exists(txt_path) and os.path.getsize(txt_path) > 0:
            try:
                with open(txt_path, 'r') as infile:
                    # Read and write the content line by line to the output file
                    for line in infile:
                        outfile.write(line)
                print(f"Successfully merged: {txt_path}")
            except Exception as e:
                print(f"Error reading file {txt_path}: {e}")
        else:
            print(f"Skipping empty or non-existent file: {txt_path}")

print(f"All files have been merged into {output_file}.")

def delete_files(file_list, skip_last=False):
    # Read the list of file paths
    try:
        with open(file_list, 'r') as file:
            file_paths = file.read().splitlines()
    except FileNotFoundError:
        print(f"Error: {file_list} not found!")
        return

    # If skip_last is True, exclude the last file in the list
    if skip_last and file_paths:
        file_paths = file_paths[:-1]

    # Delete each file in the list
    for file_path in file_paths:
        try:
            if os.path.exists(file_path):
                os.remove(file_path)
                print(f"Deleted: {file_path}")
            else:
                print(f"File not found: {file_path}")
        except Exception as e:
            print(f"Error deleting {file_path}: {e}")

# Paths to the list files
list1 = 'list.txt'
list2 = 'list2.txt'

# Delete files listed in list.txt except the last one
delete_files(list1, skip_last=True)

# Delete all files listed in list2.txt
delete_files(list2)

print("File deletion process completed!")