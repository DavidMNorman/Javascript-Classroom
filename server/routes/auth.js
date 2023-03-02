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
    res.status(200).send(res.locals);
  },
);

module.exports = router;
