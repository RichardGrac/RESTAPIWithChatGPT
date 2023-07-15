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

router.delete('/:id', (req, res) => {
  const meetupId = req.params.id;

  // Read meetups from file
  const meetups = readMeetupsFromFile();

  // Find the index of the meetup with the given ID
  const meetupIndex = meetups.findIndex((meetup) => meetup.id === meetupId);

  // If the meetup with the given ID does not exist, return a 404 error
  if (meetupIndex === -1) {
    return res.status(404).json({ error: 'Meetup not found' });
  }

  // Remove the meetup from the meetups array
  const deletedMeetup = meetups.splice(meetupIndex, 1)[0];

  // Write updated meetups to file
  writeMeetupsToFile(meetups);

  res.status(200).json(deletedMeetup);
});

module.exports = router;
