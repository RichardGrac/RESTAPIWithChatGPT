const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
const meetupsFile = './meetups.json';

// Helper function to read meetups from JSON file
function readMeetupsFromFile() {
  const meetupsData = fs.readFileSync(meetupsFile);
  return JSON.parse(meetupsData);
}

// Helper function to write meetups to JSON file
function writeMeetupsToFile(meetups) {
  fs.writeFileSync(meetupsFile, JSON.stringify(meetups, null, 2));
}

router.post('/', (req, res) => {
  const { title, summary, address } = req.body;

  if (!title || !summary || !address) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const id = uuidv4();

  const meetup = {
    id,
    title,
    summary,
    address
  };

  // Read existing meetups from file
  const meetups = readMeetupsFromFile();

  // Add the new meetup to the existing meetups array
  meetups.push(meetup);

  // Write updated meetups to file
  writeMeetupsToFile(meetups);

  res.status(201).json(meetup);
});

module.exports = router;
