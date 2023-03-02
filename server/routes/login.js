const express = require('express');
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');

const router = express.Router();

router.get(
  '/',
  // serve up the login page
);

router.post(
  '/',
  userController.verifyUser,
  userController.getID,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    if (res.locals.auth === true) {
      console.log(`${req.body.username} successfully logged in`);
      return res.status(200).send(res.locals);
    }
    console.log('login unsuccessful');
    return res.redirect('/login');
  },
);

module.exports = router;
