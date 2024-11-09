const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const { exec } = require('child_process'); // Import child_process for running external scripts

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Endpoint to save image
app.post('/save-image', (req, res) => {
  const imageData = req.body.imageData;

  if (!imageData) {
    return res.status(400).json({ message: 'No image data received.' });
  }

  // Decode base64 data and save the image
  const base64Data = imageData.replace(/^data:image\/jpeg;base64,/, '');
  const filePath = path.join(__dirname, 'one.jpg');

  fs.writeFile(filePath, base64Data, 'base64', (err) => {
    if (err) {
      console.error('Error saving image:', err);
      return res.status(500).json({ message: 'Failed to save image.' });
    }
    console.log('Image saved successfully as one.jpg');

    // Run the Python script after saving the image
    exec('python run_all.py', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing Python script: ${error}`);
        return res.status(500).json({ message: 'Failed to execute Python script.' });
      }
      console.log(`Python script output: ${stdout}`);

      // Wait until the Python script finishes and output.json is updated
      fs.readFile('output.json', 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading output.json:', err);
          return res.status(500).json({ message: 'Failed to read output.json.' });
        }

        // Parse the JSON data
        const jsonData = JSON.parse(data);

        // Get the last index from the JSON
        const lastIndex = jsonData[jsonData.length - 1]["totals"];

        // Send the last index as part of the response
        res.status(200).json({
          success: true,
          lastIndex: lastIndex
        });
      });
    });
  });
});

// Start the server
app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});
