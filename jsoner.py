import csv
import json
from collections import defaultdict

# Input and output file paths
csv_file_path = 'output.csv'  # replace with your actual CSV file path
json_file_path = 'output.json'  # replace with the desired JSON output file path

# Dictionary to hold aggregated data and totals
aggregated_data = defaultdict(lambda: {
    'calories': 0,
    'protein': 0,
    'carbs': 0,
    'fats': 0,
    'vitamins': set(),
    'saturatedFat': 0,
    'fibre': 0
})

# Totals dictionary to hold sum of all nutrients and unique vitamins
totals = {
    'calories': 0,
    'protein': 0,
    'carbs': 0,
    'fats': 0,
    'vitamins': set(),  # Using a set to store unique vitamins
    'saturatedFat': 0,
    'fibre': 0
}

# Open and read the CSV file
with open(csv_file_path, mode='r') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    
    for row in csv_reader:
        name = row['name']
        
        # Overwrite previous values with the latest row for each 'name'
        aggregated_data[name]['calories'] = float(row['calories'])
        aggregated_data[name]['protein'] = float(row['protein'])
        aggregated_data[name]['carbs'] = float(row['carbs'])
        aggregated_data[name]['fats'] = float(row['fats'])
        aggregated_data[name]['saturatedFat'] = float(row['saturatedFat'])
        aggregated_data[name]['fibre'] = float(row['fibre'])
        
        # Collect unique vitamins for the individual item
        vitamins = row['vitamins'].split(", ")
        aggregated_data[name]['vitamins'].update(vitamins)

# Summing up totals for each nutrient category
json_data = []
for name, data in aggregated_data.items():
    data['vitamins'] = ', '.join(sorted(data['vitamins']))  # Convert set to sorted string
    json_data.append(data)  # Add individual item data to the JSON array

    # Accumulate totals for each nutrient and all unique vitamins
    totals['calories'] += data['calories']
    totals['protein'] += data['protein']
    totals['carbs'] += data['carbs']
    totals['fats'] += data['fats']
    totals['saturatedFat'] += data['saturatedFat']
    totals['fibre'] += data['fibre']
    totals['vitamins'].update(data['vitamins'].split(", "))  # Add vitamins from each item

# Convert the vitamins set to a sorted string for the totals
totals['vitamins'] = ', '.join(sorted(totals['vitamins']))

# Add the totals to the JSON data as a summary entry
json_data.append({'totals': totals})

# Write the JSON data to the output file
with open(json_file_path, mode='w') as json_file:
    json.dump(json_data, json_file, indent=4)

print(f"JSON file '{json_file_path}' created successfully.")
