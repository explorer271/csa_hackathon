const fs = require('fs');
const Papa = require('papaparse'); // CSV parser

const foods = [
    { name: "Bhatura", calories: 230, protein: 5.6, carbs: 30, fats: 11, vitamins: ['A','B12','C'], saturatedFat: 1.9, fibre: 3.5 },
    { name: "Bhindi Masala", calories: 107, protein: 1, carbs: 8, fats: 7.1, vitamins: ['A','C','K'], saturatedFat: 1.7, fibre: 1 },
    { name: "Biryani", calories: 257, protein: 15.9, carbs: 48.07, fats: 9.82, vitamins: ['B6','E'], saturatedFat: 1.28, fibre: 2.2 },
    { name: "Chole", calories: 164, protein: 8.9, carbs: 27, fats: 2.6, vitamins: ['D3','B1'], saturatedFat: 0.3, fibre: 7.6 },
    { name: "Shahi Paneer", calories: 143, protein: 4.8, carbs: 6.7, fats: 10.8, vitamins: ['B3','D'], saturatedFat: 6.6, fibre: 2.0 },
    { name: "Chicken", calories: 177, protein: 27.3, carbs: 0, fats: 7.5, vitamins: ['B3','B12'], saturatedFat: 2.9, fibre: 0 },
    { name: "Dal", calories: 90.45, protein: 4.68, carbs: 10.18, fats: 3.24, vitamins: ['B','C','K'], saturatedFat: 0.11, fibre: 3.45 },
    { name: "Dhokla", calories: 194.91, protein: 5.44, carbs: 30.86, fats: 5.2, vitamins: ['A','E','C','B','K'], saturatedFat: 1.59, fibre: 5.12 },
    { name: "Gulab Jamun", calories: 360, protein: 5.61, carbs: 64.7, fats: 10.9, vitamins: ['B9','C'], saturatedFat: 3.21, fibre: 0.2 },
    { name: "Idli", calories: 132, protein: 2.5, carbs: 28, fats: 0.4, vitamins: ['B','E'], saturatedFat: 0.07, fibre: 0.9 },
    { name: "Jalebi", calories: 350, protein: 0.5, carbs: 72, fats: 5, vitamins: ['C'], saturatedFat: 1.5, fibre: 0.1 },
    { name: "Modak", calories: 237, protein: 3.5, carbs: 44.5, fats: 6.5, vitamins: ['B12'], saturatedFat: 2, fibre: 0.5 },
    { name: "Palak Paneer", calories: 110, protein: 4.7, carbs: 5.4, fats: 7.1, vitamins: ['A','C','K'], saturatedFat: 4.2, fibre: 1.3 },
    { name: "Poha", calories: 130, protein: 2.5, carbs: 24.5, fats: 3.6, vitamins: ['B'], saturatedFat: 0.9, fibre: 2.5 },
    { name: "Rice", calories: 130, protein: 2.7, carbs: 28, fats: 0.3, vitamins: ['B1'], saturatedFat: 0.1, fibre: 0.4 },
    { name: "Roti", calories: 297, protein: 9.3, carbs: 59.5, fats: 3.7, vitamins: ['B1','B2'], saturatedFat: 0.5, fibre: 2.6 },
    { name: "Samosa", calories: 262, protein: 5.6, carbs: 31, fats: 13, vitamins: ['B'], saturatedFat: 2.8, fibre: 3.5 },
    { name: "Aloo Gobi", calories: 80, protein: 1.9, carbs: 10.7, fats: 3.6, vitamins: ['C','K'], saturatedFat: 0.5, fibre: 2.9 },
    { name: "Aloo Masala", calories: 97, protein: 2.1, carbs: 11.6, fats: 4.6, vitamins: ['C'], saturatedFat: 0.4, fibre: 3.1 },
    { name: "Chai", calories: 45, protein: 0.5, carbs: 8.3, fats: 1.2, vitamins: ['B2','C'], saturatedFat: 0.7, fibre: 0 },
    { name: "Coconut Chutney", calories: 188, protein: 2, carbs: 8.4, fats: 18, vitamins: ['C','E'], saturatedFat: 16, fibre: 2 },
    { name: "Dosa", calories: 168, protein: 2.7, carbs: 30, fats: 3.7, vitamins: ['B','C'], saturatedFat: 0.4, fibre: 1.7 },
    { name: "Dum Aloo", calories: 97, protein: 2.1, carbs: 11.6, fats: 4.6, vitamins: ['B6','C'], saturatedFat: 0.4, fibre: 3.1 },
    { name: "Fish Curry", calories: 155, protein: 15, carbs: 3, fats: 8, vitamins: ['B12','D'], saturatedFat: 2.2, fibre: 0.3 },
    { name: "Ghevar", calories: 379, protein: 4.3, carbs: 40.3, fats: 22.3, vitamins: ['A','B'], saturatedFat: 10.2, fibre: 0.5 },
    { name: "Green Chutney", calories: 37, protein: 1.5, carbs: 5.7, fats: 0.8, vitamins: ['C','A'], saturatedFat: 0.1, fibre: 2.1 },
    { name: "Kebab", calories: 200, protein: 18, carbs: 5, fats: 12, vitamins: ['B12'], saturatedFat: 5, fibre: 0.7 },
    { name: "Kheer", calories: 120, protein: 3, carbs: 18, fats: 4.5, vitamins: ['B2','D'], saturatedFat: 2.1, fibre: 0.5 },
    { name: "Kulfi", calories: 180, protein: 3, carbs: 25, fats: 8, vitamins: ['D','B12'], saturatedFat: 5.5, fibre: 0 },
    { name: "Lassi", calories: 60, protein: 3, carbs: 7.8, fats: 2.5, vitamins: ['B2','B12'], saturatedFat: 1.6, fibre: 0 },
    { name: "Mutton Curry", calories: 210, protein: 20, carbs: 5, fats: 12, vitamins: ['B12'], saturatedFat: 4, fibre: 0 },
    { name: "Onion Pakoda", calories: 400, protein: 5.4, carbs: 30, fats: 27.5, vitamins: ['C'], saturatedFat: 5.5, fibre: 2.4 },
    { name: "Rajma Curry", calories: 130, protein: 7.5, carbs: 20, fats: 4, vitamins: ['B1','B2'], saturatedFat: 0.5, fibre: 7.5 },
    { name: "Ras Malai", calories: 250, protein: 7.8, carbs: 35, fats: 8, vitamins: ['B9','D'], saturatedFat: 3.4, fibre: 0.1 },
    { name: "Aloo Paratha", calories: 200, protein: 3.8, carbs: 27, fats: 8, vitamins: ['B','C'], saturatedFat: 2.5, fibre: 3.3 },
    { name: "Rasgulla", calories: 186, protein: 4, carbs: 38, fats: 0.7, vitamins: ['B9'], saturatedFat: 0.5, fibre: 0 },
    { name: "Chicken Tikka", calories: 180, protein: 25, carbs: 2, fats: 7, vitamins: ['B12'], saturatedFat: 2.2, fibre: 0.4 },
    { name: "Khichdi", calories: 120, protein: 4, carbs: 22, fats: 2, vitamins: ['B'], saturatedFat: 0.2, fibre: 2.5 },
    { name: "Omelette", calories: 154, protein: 10, carbs: 1, fats: 12, vitamins: ['D','B12'], saturatedFat: 3.3, fibre: 0 },
    { name: "Uttapam", calories: 190, protein: 5.5, carbs: 32, fats: 4, vitamins: ['B','C'], saturatedFat: 0.4, fibre: 2 },
    { name: "Paneer", calories: 265, protein: 18, carbs: 6.1, fats: 20.8, vitamins: ['D','B12'], saturatedFat: 13.4, fibre: 0 },
    { name: "Dal Makhani", calories: 120, protein: 7.1, carbs: 12, fats: 4.5, vitamins: ['B6'], saturatedFat: 1.7, fibre: 4.3 },
    { name: "Poori", calories: 250, protein: 5.5, carbs: 26.5, fats: 14, vitamins: ['B1','B2'], saturatedFat: 6, fibre: 1.2 },
    { name: "Sambhar", calories: 60, protein: 2.5, carbs: 9, fats: 2, vitamins: ['A','C','B'], saturatedFat: 0.4, fibre: 3.7 },
    { name: "Papad", calories: 371, protein: 19, carbs: 47, fats: 1, vitamins: ['B6'], saturatedFat: 0, fibre: 7.5 },
    { name: "Vada", calories: 250, protein: 5.5, carbs: 24, fats: 14, vitamins: ['B6'], saturatedFat: 2, fibre: 4 },
    { name: "Burger", calories: 295, protein: 11, carbs: 30, fats: 15, vitamins: ['B12'], saturatedFat: 6.5, fibre: 2.5 },
    { name: "Butter Naan", calories: 317, protein: 9.2, carbs: 54, fats: 8, vitamins: ['B1','B2'], saturatedFat: 3, fibre: 2 },
    { name: "Fried Rice", calories: 151, protein: 3, carbs: 22, fats: 4.5, vitamins: ['B1','B3'], saturatedFat: 0.9, fibre: 0.7 },
    { name: "Kathi Roll", calories: 200, protein: 10, carbs: 25, fats: 7, vitamins: ['B12'], saturatedFat: 2.5, fibre: 3 },
    { name: "Chole Bhature", calories: 450, protein: 13, carbs: 60, fats: 16, vitamins: ['B12'], saturatedFat: 3.8, fibre: 6.2 },
    { name: "Kadai Paneer", calories: 190, protein: 10, carbs: 9, fats: 13, vitamins: ['B12'], saturatedFat: 8, fibre: 1.8 },
    { name: "Masala Dosa", calories: 169, protein: 3, carbs: 23, fats: 7, vitamins: ['B','C'], saturatedFat: 0.3, fibre: 2.5 },
    { name: "Momos", calories: 125, protein: 4, carbs: 18, fats: 3, vitamins: ['B6'], saturatedFat: 1, fibre: 0.5 },
    { name: "Pakode", calories: 386, protein: 6, carbs: 40, fats: 22, vitamins: ['C'], saturatedFat: 3.8, fibre: 3.4 },
    { name: "Pani Puri", calories: 110, protein: 1.2, carbs: 17, fats: 5, vitamins: ['B6'], saturatedFat: 1.3, fibre: 1 },
    { name: "Pav Bhaji", calories: 110, protein: 3.6, carbs: 11.6, fats: 5.8, vitamins: ['B1'], saturatedFat: 1.2, fibre: 4 },
    { name: "Pizza", calories: 266, protein: 11, carbs: 33, fats: 10, vitamins: ['B12','E'], saturatedFat: 4.6, fibre: 2 }
];

const imageSize = require('image-size'); // Import the image-size package

function loadImageDimensions(imagePath) {
    return new Promise((resolve, reject) => {
        try {
            const dimensions = imageSize(imagePath); // Get dimensions using image-size
            resolve({ imageWidth: dimensions.width, imageHeight: dimensions.height });
        } catch (error) {
            reject("Error loading image: " + error);
        }
    });
}

// Example usage to get image dimensions and process file
loadImageDimensions('one.jpg')
    .then(({ imageWidth, imageHeight }) => {
        console.log(`Image Height: ${imageHeight} pixels`);
        console.log(`Image Width: ${imageWidth} pixels`);

        // Now, process the text file
        fs.readFile('merged_output.txt', 'utf8', (err, data) => {
            if (err) {
                console.error("Error reading file:", err);
                return;
            }
            const excludedFoods = ["Bhatura", "Chicken", "Dhokla", "Gulab Jamun", "Idli", "Jalebi", "Modak", "Roti", "Samosa", "Chai", "Dosa", "Kebab", "Kulfi", "Lassi", "Rasgulla", "Aloo Paratha", "Omelette", "Uttapam", "Poori", "Papad", "Vada", "Kathi Roll", "Masala Dosa", "Momos", "Pakode", "Pani Puri"];
            const forbiddenfoods=["Lassi","Coconut Chutney"]
            const lines = data.split('\n');
            const result = [];

            lines.forEach(line => {
                const cleanedLine = line.trim();
                if (cleanedLine) {
                    const numbers = cleanedLine.split(/\s+/).map(Number);
                    
                    if (numbers.length === 5) {
                        const [i, num2, num3, w, h] = numbers;
                        const n=2;
                        const food = foods[i];
                            var cal=0;
                            var protein=0;
                            var carbs=0;
                            var fats=0;
                            var vitamins=[];
                            var saturatedFat=0;
                            var fibre=0;
                        if (excludedFoods.includes(foods[i]['name'])) {
                            
                            cal = food.calories*n/2;
                            protein = food.protein*n/2;
                            carbs = food.carbs*n/2;
                            fats = food.fats*n;
                            vitamins = food.vitamins.join(', ');
                            saturatedFat = food.saturatedFat*n/2;
                            fibre = food.fibre*n / 2;
                        }
                        else{
                        // Use the image dimensions for volume calculation
                        const vol = (imageHeight * h * 2.54 / 175) * (imageWidth * w * 2.54 / 175) * 2 * 1.4;
                        console.log(`Image Height used: ${imageHeight}`);
                        console.log(`Image Width used: ${imageWidth}`);
                        console.log(`Volume: ${vol}`);

                        
                        cal = food.calories * vol / 100;
                        protein = food.protein * vol / 100;
                        carbs = food.carbs * vol / 100;
                        fats = food.fats * vol / 100;
                        vitamins = food.vitamins.join(', ');
                        saturatedFat = food.saturatedFat * vol / 100;
                        fibre = food.fibre * vol / 100;
                        }
                        // Add to result array
                        result.push({
                            name: food.name,
                            calories: cal,
                            protein: protein,
                            carbs: carbs,
                            fats: fats,
                            vitamins: vitamins,
                            saturatedFat: saturatedFat,
                            fibre: fibre,
                        });
                    }
                }
            });

            // Convert result to CSV
            const csv = Papa.unparse(result);

            // Write to CSV file
            fs.writeFile('output.csv', csv, (err) => {
                if (err) {
                    console.error("Error writing CSV:", err);
                } else {
                    console.log("CSV file has been saved as output.csv");
                }
            });
        });
    })
    .catch((error) => {
        console.error(error);
    });
