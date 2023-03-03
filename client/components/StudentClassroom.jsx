import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import AssignmentCard from './AssignmentCard';

export default function Classroom(props) {
  // const [token, setToken] = useState();
  // const [role, setRole] = useState();
  const role = 'student';
  const [assignments, setAssignments] = useState(0);
  const [assignmentElems, setAssignmentElems] = useState([]);
  const [assignOpen, setAssignOpen] = useState(null);
  const [assignName, setAssignName] = useState();
  const [assignId, setAssignId] = useState();
  const [assignBody, setAssignBody] = useState('');
  const [initialBody, setInitialBody] = useState('');
  console.log('assignId is: ', assignId);

  const aElems = assignmentElems.map((assign) => (
    <div className="assignment-card">
      <AssignmentCard
        key={assign._id}
        id={assign._id}
        name={assign.name}
        desc={assign.description}
        due={assign.dueDate}
        role={role}
        body={assign.body}
        setAssignOpen={setAssignOpen}
        assignOpen={assignOpen}
        setAssignId={setAssignId}
        setAssignName={setAssignName}
        setInitialBody={setInitialBody}
      />
    </div>
  ));
  console.log('You have this many assigments: ', aElems.length);

  const handleAssignSubmit = (e) => {
    e.preventDefault();
    console.log('assign Body is ', assignBody);
    console.log('assignId is ', assignId);
    const assign = {
      id: assignId,
      name: assignName,
      main: assignBody,
    };
    console.log('assign sent is ', assign);
    fetch('api/assignments', {
      method: 'PUT',
      body: JSON.stringify(assign),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => {
        console.log('assignment has been saved');
        setAssignOpen(false);
      });
  };

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
        console.log('assignments are: ', data.assignments);
        setAssignmentElems(data.assignments);
      })
      .catch((err) => console.log(`error in fetching assignments ${err}`));
  }, [assignments]);

  return (
    <>
      {!assignOpen
      && (
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
          <br />
          <Link to="/">
            <button className="logout" type="button">
              Log Out
            </button>
          </Link>
        </>
      )}
      {assignOpen
      && (
        <>
          <header>
            <h1>Assignment: {assignName}</h1>
          </header>
          <main>
            <h4>Pretend this is a code editor!</h4>
            <textarea onChange={(e) => setAssignBody(e.target.value)}>{initialBody}</textarea>
            <button type="button" onClick={handleAssignSubmit}>Save</button>
          </main>
        </>
      )}
    </>
  );
}
