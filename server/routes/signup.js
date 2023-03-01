const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/',
  // serve up the signup file
);

router.post(
  '/',
  userController.hashPW,
  userController.addUser,
  (req, res) => {
    console.log('user creation complete');
    return res.status(200).redirect('/login');
  },
);

module.exports = router;
