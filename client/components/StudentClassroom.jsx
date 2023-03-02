import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import AssignmentCard from './AssignmentCard';

export default function Classroom(props) {
  // const [token, setToken] = useState();
  // const [role, setRole] = useState();
  const [assignments, setAssignments] = useState(0);
  const [assignmentElems, setAssignmentElems] = useState([]);
  const handleOpen = (e) => {
    e.preventDefault();
  };

  const aElems = assignmentElems.map((assign, i) => (
    <div className="assignment-card">
      <AssignmentCard
        key={assign._id}
        name={assign.name}
        desc={assign.description}
        due={assign.dueDate}
      />
      <button type="button" onClick={handleOpen}>Open</button>
    </div>
  ));
  console.log('You have this many assigments: ', aElems.length);

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
        console.log(`error in token auth: ${err}`);
      });
    console.log('useEffect says assignment # is: ', aElems.length);
  });

  useEffect(() => {
    fetch('api/assignments')
      .then((data) => data.json())
      .then((data) => {
        // if (assignments !== data.length) setAssignments(data.length);
        console.log(data);
        setAssignmentElems(data.assignments);
      })
      .catch((err) => console.log(`error in fetching assignments ${err}`));
  }, [assignments]);

  return (
    <>
      <header>
        <h1>Classroom for Students</h1>
      </header>
      <div className="assignment-container">
        {aElems}
      </div>
      <Link to="/app/student">
        <button type="button">
          Re-render to test auth!
        </button>
      </Link>
    </>
  );
}
