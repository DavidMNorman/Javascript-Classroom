import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import Classroom from './TeacherClassroom';

export default function Login(props) {
  const [role, setRole] = useState('student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [loggedIn, setLoggedIn] = useState(false);
  // const [history, setHistory] = useState();
  // const [history, setHistory] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      role,
      username,
      password,
    };
    fetch('api/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('in login promise response handler with ', response.status);
        if (response.status === 200 && role === 'teacher') navigate('/app/teacher');
        if (response.status === 200 && role === 'student') navigate('/app/student');
      })
      .catch((err) => {
        console.log(`error in login submit: ${err}`);
      });
  };

  return (
    <div id="login">
      <header>
        <h1>Welcome to JavaScript Classroom!</h1>
        <h2>Log in to your account</h2>
      </header>
      <main>
        <br />
        <form className="login" onSubmit={handleSubmit}>
          <label htmlFor="userRole">
            I am a...
            <br />
            <select id="userRole" name="type" onChange={(e) => setRole(e.target.value)}>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </label>
          <br />
          <label htmlFor="usernameBox">
            Username:
            <br />
            <input id="usernameBox" name="username" type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
          </label>
          <br />
          <br />
          <label htmlFor="passwordBox">
            Password:
            <br />
            <input id="passwordBox" name="password" type="password" onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <br />
          <label htmlFor="loginSubmit">
            <input className="submit" id="loginSubmit" type="submit" />
          </label>
        </form>
        <br />
        <p>Don't have an account?</p>
        <Link to="/signup">
          <div className="button-container">
            <button id="signup-button" type="button">
              Sign up!
            </button>
          </div>
        </Link>
      </main>
    </div>
  );
}
