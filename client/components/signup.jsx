import React, { useState } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
// const cookieId = Cookies.get('ssid');
// const user_id = cookieId.slice(3,cookieId.length - 1);

export default function Signup(props) {
  const [role, setRole] = useState('student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      role,
      username,
      password,
      email,
      fullName,
    };
    console.log(user);
    const response = await fetch('api/signup', {
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
      <form className="signup" onSubmit={handleSubmit}>
        <label htmlFor="userRole">
          I am a...
          <select id="userRole" name="type" onChange={(e) => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </label>
        <label htmlFor="usernameBox">
          Username:
          <input id="usernameBox" name="username" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label htmlFor="passwordBox">
          <input id="passwordBox" name="password" type="Password" onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label htmlFor="emailBox">
          Email:
          <input id="emailBox" name="email" type="Email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label htmlFor="fullNameBox">
          Full Name:
          <input id="fullNameBox" name="fullName" type="text" placeholder="Full Name" onChange={(e) => setFullName(e.target.value)} />
        </label>
        <label htmlFor="signupSubmit">
          <input id="signupSubmit" type="submit" />
        </label>
      </form>
      <Link to="/">
        <button type="button">
          Already Have An Account?
        </button>
      </Link>
    </>
  );
}
