const express = require('express');
const fs = require('fs');
const router = express.Router();
const meetupsFile = './meetups.json';

// Helper function to read meetups from JSON file
function readMeetupsFromFile() {
  const meetupsData = fs.readFileSync(meetupsFile);
  return JSON.parse(meetupsData);
}

router.get('/', (req, res) => {
  // Read meetups from file
  const meetups = readMeetupsFromFile();

  res.status(200).json(meetups);
});

module.exports = router;
