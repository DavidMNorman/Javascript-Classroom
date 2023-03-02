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

router.post(
  '/',
  async (req, res) => {
    try {
      const assign = req.body;
      await models.Assignment.create({
        name: assign.name, description: assign.desc, dueDate: assign.due
      });
      return res.status(200).send('yeah boiiiiii');
    } catch (e) {
      return console.log(`Hey buddy, you got a big e problem in assign posting ${e}`);
    }
  },
);

module.exports = router;
