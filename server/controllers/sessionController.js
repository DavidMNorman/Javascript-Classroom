const Session = require('../models/sessionModel');

const sessionController = {};

sessionController.isLoggedIn = async (req, res, next) => {
  // check to see if req.cookies.SSID's ObjectId matches an active session in Session
  console.log('req.cookies.SSID:', req.cookies.SSID);
  const active = await Session.exists({ cookieId: req.cookies.SSID });
  console.log('session is active?', active);
  res.locals.auth = active;
  return next();
};

sessionController.startSession = (req, res, next) => {
  console.log('in sessionController.startSession with cookieID of ', res.locals.cookieID);
  Session.create({ cookieId: res.locals.cookieID });
  console.log('Session Started');
  return next();
};

module.exports = sessionController;
