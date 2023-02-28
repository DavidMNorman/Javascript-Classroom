const path = require('path');
const express = require('express');

const app = express();

// require in api routes

const PORT = 3000;

// parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// handle requests for static files
app.use(express.static(path.resolve(__dirname, '../client')));

// route handlers


// catch-all route handler
app.use((_, res) => res.status(404).send('Page Not Found'));

// error handler
app.use((err, _, res, __) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
