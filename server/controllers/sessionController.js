const models = require('../models/JSClassroomModels');

const sessionController = {};

sessionController.isLoggedIn = async (req, res, next) => {
  try {
    // check to see if req.cookies.SSID's ObjectId matches an active session in Session
    console.log('req.cookies.SSID:', res.locals.cookieID);
    const active = await models.Session.exists({ cookieId: res.locals.cookieID });
    console.log('active is, ', active);
    res.locals.auth = !!active;
    console.log('session is active?', res.locals.auth);
    return next();
  } catch (e) {
    return console.log(e);
  }
};

sessionController.startSession = (req, res, next) => {
  console.log('in sessionController.startSession with cookieID of ', res.locals.cookieID);
  console.log('start session auth value: ', res.locals.auth);
  if (res.locals.auth !== true) {
    console.log('creating session');
    models.Session.create({ cookieId: res.locals.cookieID })
      .then((_response) => {
        console.log('Session Started');
        return next();
      })
      .catch((e) => console.log(e));
  } else {
    return next();
  }
};

module.exports = sessionController;
