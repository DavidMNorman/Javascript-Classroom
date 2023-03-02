import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import AssignmentCard from './AssignmentCard';

export default function Classroom(props) {
  // const [token, setToken] = useState();
  // const [role, setRole] = useState();
  const [assignments, setAssignments] = useState(0);
  const [assignmentElems, setAssignmentElems] = useState([]);
  let classAssignments = [];
  const aElems = assignmentElems.map((assign, i) => (
    <AssignmentCard
      key={i}
      // info={assign}
    />
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
    // const aElems = assignmentElems.map((assign, i) => (
    //   <AssignmentCard
    //     key={i}
    //     // info={assign}
    //   />
    // ));
    console.log('useEffect says assignment # is: ', aElems.length);
  });

  useEffect(() => {
    fetch('api/assignments')
      .then((data) => data.json())
      .then((data) => {
        // if (assignments !== data.length) setAssignments(data.length);
        console.log(data);
        classAssignments = data.assignments;
        setAssignmentElems(data.assignments);
      })
      // .then((data) => {
      //   assignmentElems = data.map((assign, i) => (
      //     <AssignmentCard
      //       key={i}
      //       info={assign}
      //     />
      //   ));
      // })
      .catch((err) => console.log(`error in fetching assignments ${err}`));
  }, [assignments]);

  return (
    <>
      <h1>Classroom Component for Teachers</h1>
      <p>Put some stuff here</p>
      {aElems}
      <Link to="/app/Teacher">
        <button type="button">
          Re-render to test auth!
        </button>
      </Link>
    </>
  );
}
