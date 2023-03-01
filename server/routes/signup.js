const express = require('express');
const path = require('path');
const userController = require('../controllers/userController');

const router = express.Router();

router.get(
  '/',
  // serve up the signup file
  (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
  },
);

router.post(
  '/',
  userController.hashPW,
  userController.addUser,
  (req, res) => {
    console.log('user creation complete');
    return res.status(200).redirect('/');
  },
);

module.exports = router;
