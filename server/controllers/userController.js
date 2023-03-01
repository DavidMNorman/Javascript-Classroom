const bcrypt = require('bcrypt');
const userDb = require('../models/accountModels');

const userController = {};
const SALT_WORK_FACTOR = 10;

userController.hashPW = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, SALT_WORK_FACTOR)
    req.body.password = hash;
    return next();
  } catch (e) {
    console.log(e);
    return next({
      log: 'Error in userController in hashPW',
      message: { err: 'userController.hashPW: ERROR: Check server logs for details ' },
    });
  }
};

userController.addUser = async (req, res, next) => {
  const user = req.body;
  try {
    let createReq = '';
    if (user.role === 'teacher') createReq = 'INSERT INTO teacher (username, password, email, name) VALUES ($1, $2, $3, $4) ';
    else createReq = 'INSERT INTO student (username, password, email, name) VALUES ($1, $2, $3, $4) ';
    await userDb.query(createReq, [user.username, user.password, user.email, user.name]);
    console.log('user created for req.body.username');
    return next();
  } catch (e) {
    console.log(e);
    return next({
      log: 'Error in userController in addUser',
      message: { err: 'userController.addUser: ERROR: Check server logs for details ' },
    });
  }
};
// BODY SHOULD HAVE TYPE PROPERTY WITH TEACHER OR STUDENT

userController.verifyUser = async (req, res, next) => {
  try {
    console.log('in verify user');
    const verifyQuery = `SELECT password FROM ${req.body.role} WHERE username = '${req.body.username}'`;
    // if (user.role === 'teacher') verifyQuery = 'SELECT password FROM teacher WHERE '
    const user = await userDb.query(verifyQuery);
    console.log('returned user is: ', user.rows[0].password);
    // compare returned password with bcrypt compare
    res.locals.auth = await bcrypt.compare(req.body.password, user.rows[0].password);
    console.log(res.locals.auth);
    return next();
  } catch (e) {
    console.log(e);
    return next({
      log: 'Error in userController in verifyUser',
      message: { err: 'userController.verifyUser: ERROR: Check server logs for details ' },
    });
  }
};

userController.getStudents = async (req, res, next) => {
  // figure out how to pull class id from body of request -
  // teacher should have clicked on a classroom
  const classroom = req.body.class_id;
  // select only the students for the particular class _id
  const students = `SELECT s.name AS student, FROM `
  // query databse with students

  // assign res.locals to the response of the query
};

module.exports = userController;
