from PIL import Image

# Load the image
image_path = 'one.jpg'  # Replace with your image file path
img = Image.open(image_path)

# Get the dimensions of the original image
width, height = img.size

# Calculate the size of each part
part_width = width // 3
part_height = height // 3

# Split the image into 9 parts
for row in range(3):
    for col in range(3):
        # Define the coordinates of the current part
        left = col * part_width
        upper = row * part_height
        right = left + part_width
        lower = upper + part_height
        
        # Crop the image
        cropped_img = img.crop((left, upper, right, lower))
        
        # Save the cropped part
        cropped_img.save(f'part_{row+1}_{col+1}.jpg')

print("Image successfully split into 9 parts.")


import os



# Path to the list of image paths
list_file = 'list.txt'

# Read the list of image paths from list.txt
with open(list_file, 'r') as file:
    image_paths = file.read().splitlines()

# Loop through each image path and run the Darknet command
for img_path in image_paths:
    if os.path.exists(img_path):  # Check if the image file exists
        command = f'darknet detector test C:/src/darknet/data/obj.data C:/src/darknet/cfg/yolov4-custom.cfg C:/src/darknet/backup/yolov4-custom_last.weights "{img_path}" -thresh 0.3 -dont_show -save_labels'
        print(f'Running: {command}')
        os.system(command)
    else:
        print(f"Image not found: {img_path}")

print("Processing completed!")
