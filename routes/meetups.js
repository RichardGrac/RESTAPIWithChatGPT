const express = require('express');
const authenticateToken = require("./helpers/authenticateToken");
const router = express.Router();

router.use('/', require('./getMeetups'));
router.use('/', authenticateToken, require('./createMeetup'));
router.use('/', authenticateToken, require('./updateMeetup'));
router.use('/', authenticateToken, require('./deleteMeetup'));

module.exports = router;
