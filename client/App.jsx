import React, { Component, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './components/login';
import TeacherClassroom from './components/TeacherClassroom';
import StudentClassroom from './components/StudentClassroom';
import Signup from './components/signup';

function App(props) {
  const [role, setRole] = useState();
  return (
    <>
      {/* <header>
        <h1>Welcome to JavaScript Classroom!</h1>
      </header> */}
      {/* { splash === 'login' && <Login splash={splash} setSplash={setSplash} /> }
      { splash === 'signup' && <Signup /> } */}
      <div className="router">
        <Routes>
          <Route
            path="/"
            element={<Login role={role} setRole={setRole} />}
          />
          <Route
            path="/signup"
            element={<Signup role={role} setRole={setRole} />}
          />
          <Route
            path="/app/teacher"
            element={<TeacherClassroom />}
          />
          <Route
            path="/app/teacher"
            element={<StudentClassroom />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
