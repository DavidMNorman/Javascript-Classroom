import React, { Component, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './components/login';
import Classroom from './components/classroom';
import Signup from './components/signup';

function App(props) {
  return (
    <>
      <header>
        <h1>Welcome to JavaScript Classroom!</h1>
      </header>
      {/* { splash === 'login' && <Login splash={splash} setSplash={setSplash} /> }
      { splash === 'signup' && <Signup /> } */}
      <div className="router">
        <Routes>
          <Route
            path="/"
            element={<Login />}
          />
          <Route
            path="/signup"
            element={<Signup />}
          />
          <Route
            path="/app"
            element={<Classroom />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
