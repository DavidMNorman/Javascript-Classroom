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
  (req, res, next) => {
    if (res.locals.valid === false) return res.redirect('/login');
    return next();
  },
  userController.getID,
  cookieController.setSSIDCookie,
  sessionController.isLoggedIn,
  sessionController.startSession,
  (req, res) => {
    console.log(`${req.body.username} successfully logged in`);
    // console.log(res.locals);
    return res.status(200).send({ auth: res.locals.auth });
  },
);

module.exports = router;
