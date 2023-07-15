const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const bcrypt = require('bcrypt');
const router = express.Router();
const usersFile = './users.json';

// Helper function to read users from JSON file
function readUsersFromFile() {
  const usersData = fs.readFileSync(usersFile);
  return JSON.parse(usersData);
}

// Helper function to write users to JSON file
function writeUsersToFile(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

router.post('/', (req, res) => {
  const { email, password } = req.body;

  // Read existing users from file
  const users = readUsersFromFile();

  // Check if user with the given email already exists
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ error: 'Email already registered' });
  }

  // Hash the password
  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);

  // Create a new user object
  const newUser = {
    id: uuidv4(),
    email,
    password: hashedPassword,
  };

  // Add the new user to the existing users array
  users.push(newUser);

  // Write updated users to file
  writeUsersToFile(users);

  res.status(201).json({ message: 'User created successfully' });
});

module.exports = router;
