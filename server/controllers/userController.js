const userDb = require('../models/accountModels');
const bcrypt = require('bcrypt');

const userController = {};

userController.createUser = async (req, res, next) => {
  const user = req.body;
  // BODY SHOULD HAVE TYPE PROPERTY WITH TEACHER OR STUDENT
  const createReq = `INSERT INTO ${user.type} (username, password, email, name) VALUES ($1, $2, $3, $4) `;
  await userDb.query(createReq, [user.ussername, user.password, user.email, user.name]);
  if (err) {
    return next({
      log: 'Error in userController in addUser',
      message: { err: 'userController.addUser: ERROR: Check server logs for details '}
    });
  }
  return next();
};

userController.getStudents = async (req, res, next) => {
  // figure out how to pull class id from body of request - teacher should have clicked on a classroom
  const classroom = req.body.class_id;
  // select only the students for the particular class _id
  const students = `SELECT s.name AS student, FROM `
  // query databse with students

  // assign res.locals to the response of the query
}
