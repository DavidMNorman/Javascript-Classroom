import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './components/login';
import Classroom from './components/classroom';

function App(props) {
// dummy test
  return (
    <div>
      <h1>Welcome to JavaScript Classroom!</h1>
    </div>
  );
  // return (
  //   <div className="router">
  //     <Switch>
  //       <Route
  //         exact
  //         path="/"
  //         components={Login}
  //       />
  //       <Route
  //         exact
  //         path="/classroom"
  //         components={Classroom}
  //       />
  //     </Switch>
  //   </div>
  // )
}

export default App;
