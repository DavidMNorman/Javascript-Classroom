const express = require('express');

const router = express.Router();

router.get(
  '/',
  // authentication middleware
  // serve up a response
  (req, res) => {
    // console.log('passed auth in classroom router');
    res.status(200);
  },
);

module.exports = router;
