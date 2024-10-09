const { drive } = require('../config/googleDriveConfig');
const { Readable } = require('stream');
const fs = require('fs');
const path = require('path');

// Path to the JSON file for storing deedId and fileId mappings
const dataFilePath = path.join(__dirname, '../data/deedFiles.json');

// Helper function to read from JSON file
const readDataFromFile = () => {
  const data = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(data);
};

// Helper function to write to JSON file
const writeDataToFile = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
};

// Upload file to Google Drive and save fileId to JSON
exports.uploadDeed = async (req, res) => {

 
  try {
    // console.log("Request Body:", req.body); // Log request body
    // console.log("Request Params:", req.params); // Log request params
    // console.log("File:", req.file); // Log the file object

    const file = req.file;
    const deedId = req.params.id;

    const fileMetadata = {
      name: `${deedId}-${file.originalname}`,
      mimeType: file.mimetype,
    };
    const media = {
      mimeType: file.mimetype,
      body: Readable.from(file.buffer),
    };

    const driveResponse = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id',
    });

    const fileId = driveResponse.data.id;

    // Read existing data
    const data = readDataFromFile();

    // Update fileId for the corresponding deedId
    if (data[deedId]) {
      data[deedId].fileId = fileId;
    } else {
      data[deedId] = { fileId: fileId };
    }

    // Write the updated data back to the JSON file
    writeDataToFile(data);

    res.status(200).json({ fileId: fileId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// This is your existing download function in deedFiles.js or similar
exports.downloadDeed = async (req, res) => {
  try {
      const deedId = req.params.id;

      // Fetch the deed information from your data source
      const data = readDataFromFile(); // Ensure this function reads the deed files correctly
      const deed = data[deedId];

      if (!deed) {
          return res.status(404).json({ error: 'Deed not found' });
      }

      const fileId = deed.fileId;
      if (!fileId) {
          return res.status(404).json({ error: 'File not found for the given deedId' });
      }

      const driveResponse = await drive.files.get(
          { fileId: fileId, alt: 'media' },
          { responseType: 'stream' }
      );

      console.log("Arman");

      const chunks = [];
      driveResponse.data.on('data', (chunk) => {
          chunks.push(chunk);
      });

      driveResponse.data.on('end', () => {
        const buffer = Buffer.concat(chunks);
        const base64Data = buffer.toString('base64');
    
        const responseToSend = {
            fileId: fileId,
            data: base64Data,
        };
        
        console.log("Sending response:", responseToSend);
        res.json(responseToSend);
    });
    

      driveResponse.data.on('error', (err) => {
          res.status(500).json({ error: err.message });
      });
  } catch (error) {
      console.error("Error downloading deed:", error);
      res.status(500).json({ error: error.message });
  }
};



