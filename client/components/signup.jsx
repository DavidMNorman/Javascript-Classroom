import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
// const cookieId = Cookies.get('ssid');
// const user_id = cookieId.slice(3,cookieId.length - 1);

export default function Signup(props) {
  const [role, setRole] = useState('student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
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
    fetch('api/signup', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('in signup promise response handler with ', response.status);
        if (response.status === 200) navigate('/login');
        else console.log('failed to sign up');
      })
      .catch((err) => {
        console.log(`error in signup submit: ${err}`);
      });
  };
  return (
    <div id="signup">
      <header>
        <h1>Welcome to JavaScript Classroom!</h1>
        <h2>Sign up</h2>
      </header>
      <main>
        <br />
        <form className="signup" onSubmit={handleSubmit}>
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
            <input id="usernameBox" name="username" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
          </label>
          <br />
          <label htmlFor="passwordBox">
            Password:
            <br />
            <input id="passwordBox" name="password" type="Password" onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <label htmlFor="emailBox">
            Email:
            <br />
            <input id="emailBox" name="email" type="Email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
          </label>
          <br />
          <label htmlFor="fullNameBox">
            Full Name:
            <br />
            <input id="fullNameBox" name="fullName" type="text" placeholder="Full Name" onChange={(e) => setFullName(e.target.value)} />
          </label>
          <br />
          <label htmlFor="signupSubmit">
            <input className="submit" id="signupSubmit" type="submit" />
          </label>
        </form>
        <br />
        <p>Already Have An Account?</p>
        <Link to="/">
          <button type="button">
            Log in!
          </button>
        </Link>
      </main>
    </div>
  );
}
