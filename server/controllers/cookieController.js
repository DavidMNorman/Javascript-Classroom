const cookieController = {};

// cookieController.setCookie = (req, res, next) => {
//   return next();
// };

cookieController.setSSIDCookie = (req, res, next) => {
  // console.log('in setSSIDCookie');
  if (req.cookies.SSID !== res.locals.id) res.cookie('SSID', `${res.locals.id}`, { httpOnly: true });
  return next();
};

module.exports = cookieController;
