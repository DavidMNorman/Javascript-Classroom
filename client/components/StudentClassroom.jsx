import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';

export default function Classroom(props) {
  // const [token, setToken] = useState();
  // const [role, setRole] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    fetch('api/auth', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('in auth promise response handler with ', response.auth);
        if (response.auth === false) navigate('/');
      })
      .catch((err) => {
        console.log(`error in toekn auth: ${err}`);
      });
  }, []);

  return (
    <>
      <h1>Classroom Component for Students</h1>
      <p>Put some stuff here</p>
    </>
  );
}
