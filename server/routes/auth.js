const express = require('express');
const sessionController = require('../controllers/sessionController');
const userController = require('../controllers/userController');

const router = express.Router();

router.get(
  '/',
  (req, res, next) => {
    console.log('in auth router with req these cookies: ', req.cookies);
    return next();
  },
  sessionController.isLoggedIn,
  (req, res) => {
    const responseObj = { auth: res.locals.auth };
    console.log('auth response should be: ', responseObj);
    res.status(200).send(responseObj);
  },
);

module.exports = router;
