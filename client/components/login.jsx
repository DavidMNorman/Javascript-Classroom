import React, { useState } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';

export default function Login(props) {
  const [role, setRole] = useState('student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const cookieId = Cookies.get('ssid');
    // const user_id = cookieId.slice(3,cookieId.length - 1);
    const user = {
      role,
      username,
      password,
    };
    const response = await fetch('api/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    await response.json();
  };

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
