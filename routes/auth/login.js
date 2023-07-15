const express = require('express');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const usersFile = './users.json';

// Helper function to read users from JSON file
function readUsersFromFile() {
  const usersData = fs.readFileSync(usersFile);
  return JSON.parse(usersData);
}

router.post('/', (req, res) => {
  const { email, password } = req.body;

  // Read existing users from file
  const users = readUsersFromFile();

  // Find the user with the given email
  const user = users.find((u) => u.email === email);

  // If user does not exist or password does not match, return an error
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });

  res.status(200).json({ token });
});

module.exports = router;
