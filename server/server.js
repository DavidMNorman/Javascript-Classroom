const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

// require in api routes
const signupRouter = require('./routes/signup');
const loginRouter = require('./routes/login');
const classroomRouter = require('./routes/classroom');

// const PORT = process.env.NODE_ENV === 'production' ? 3000 : 8080;
const PORT = 3000;

// parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// handle requests for static files
app.use(express.static(path.resolve(__dirname, '../client')));

// route handlers
app.get(
  '/',
  (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
  },
);

app.use('/api/signup', signupRouter);
app.use('/signup', signupRouter);
app.use('/api/login', loginRouter);
app.use('/api/app', classroomRouter);

// catch-all route handler
app.use((_, res) => res.status(404).send('Page Not Found'));

// error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
