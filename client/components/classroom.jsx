import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';

export default function Classroom(props) {
  const [token, setToken] = useState();
  const navigate = useNavigate();
  const confirmToken = async () => {
    fetch('api/auth', {
      method: 'GET',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('in promise response handler with ', response.status);
        if (response.status === 200) navigate('/login');
        else console.log('failed to sign up');
      })
      .catch((err) => {
        console.log(`error in signup submit: ${err}`);
      });
  };

  useEffect(() => {
    confirmToken().then((result) => {
      setToken(result);
    });
  }, []);

  return (
    <>
      { token && <h1>Classroom Component</h1> }
      { !token && <h1>Not Allowed Here</h1> }
      <p>Put some stuff here</p>
    </>
  );
  // } else {
  //   return (
  //     <Navigate to="/" state={{ from: location}} replace />
  //   );
  // }
  // return (
  //   <>
  //     <h1>Classroom Component</h1>
  //     <p>Put some stuff here</p>
  //   </>
  // );
}
