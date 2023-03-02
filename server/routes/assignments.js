const express = require('express');
const sessionController = require('../controllers/sessionController');
const userController = require('../controllers/userController');
const models = require('../models/JSClassroomModels');

const router = express.Router();

router.get(
  '/',
  async (req, res) => {
    const assignments = await models.Assignment.find();
    console.log(`found ${assignments} from mongodb`);
    console.log('assignment find response type is array? ', Array.isArray(assignments));
    res.locals.assignments = assignments;
    return res.status(200).send({ assignments: res.locals.assignments });
  },
);

module.exports = router;
