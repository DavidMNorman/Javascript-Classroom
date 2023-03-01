import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import Classroom from './classroom';

export default function Login(props) {
  const [role, setRole] = useState('student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  // const [history, setHistory] = useState();
  // const [history, setHistory] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // const cookieId = Cookies.get('ssid');
    // const user_id = cookieId.slice(3,cookieId.length - 1);
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
        console.log('in promise response handler with ', response.status);
        if (response.status === 200) navigate('/app');
        else console.log('failed to log in');
        // response.json();
      })
      // .then((data) => {
      //   console.log('parsed data is: ', data);
      //   // if (data.auth === 200) {
      //   //   setLoggedIn(true);
      //   // } else {
      //   //   console.log('failed to log in');
      //   // }
      // })
      .catch((err) => {
        console.log(`error in login submit: ${err}`);
      });
  };
  // if (loggedIn === true) navigate('/app');

  return (
    <>
      <form className="login" onSubmit={handleSubmit}>
        <label htmlFor="userRole">
          I am a...
          <select id="userRole" name="type" onChange={(e) => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </label>
        <label htmlFor="usernameBox">
          Username:
          <input id="usernameBox" name="username" type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label htmlFor="passwordBox">
          <input id="passwordBox" name="password" type="password" onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label htmlFor="loginSubmit">
          <input id="loginSubmit" type="submit" />
        </label>
      </form>
      <Link to="/signup">
        <button type="button">
          Sign up!
        </button>
      </Link>
    </>
  );
}
