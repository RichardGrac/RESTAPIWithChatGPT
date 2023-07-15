const express = require('express');
const fs = require('fs');
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

router.patch('/:id', (req, res) => {
  const meetupId = req.params.id;
  const { title, summary, address } = req.body;

  if (!title && !summary && !address) {
    return res.status(400).json({ error: 'At least one field-value must be provided' });
  }

  // Read meetups from file
  const meetups = readMeetupsFromFile();

  // Find the index of the meetup with the given ID
  const meetupIndex = meetups.findIndex((meetup) => meetup.id === meetupId);

  // If the meetup with the given ID does not exist, return a 404 error
  if (meetupIndex === -1) {
    return res.status(404).json({ error: 'Meetup not found' });
  }

  // Get the existing meetup object
  const existingMeetup = meetups[meetupIndex];

  // Update the meetup properties if provided in the request body
  if (title !== undefined) {
    existingMeetup.title = title;
  }
  if (summary !== undefined) {
    existingMeetup.summary = summary;
  }
  if (address !== undefined) {
    existingMeetup.address = address;
  }

  // Update the meetup in the meetups array
  meetups[meetupIndex] = existingMeetup;

  // Write updated meetups to file
  writeMeetupsToFile(meetups);

  res.status(200).json(existingMeetup);
});

module.exports = router;
