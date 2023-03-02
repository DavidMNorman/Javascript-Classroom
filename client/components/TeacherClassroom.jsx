import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import AssignmentCard from './AssignmentCard';

export default function Classroom(props) {
  // const [token, setToken] = useState();
  // const [role, setRole] = useState();
  const [assignments, setAssignments] = useState(0);
  const [assignmentElems, setAssignmentElems] = useState([]);
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [due, setDue] = useState('');
  const handleEdit = (e) => {
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
      <button type="button" onClick={handleEdit}>Edit</button>
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

  const handleAdd = () => {
    setAdding(true);
  };
  const addDone = () => {
    setAdding(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const assign = {
      name,
      desc,
      due,
    };
    fetch('api/assignments', {
      method: 'POST',
      body: JSON.stringify(assign),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('in addAssign promise response handler with ', response.status);
        if (response.status === 200) {
          setAssignments(assignments + 1);
          setAdding(false);
        }
      })
      .catch((err) => {
        console.log(`error in assignment submit: ${err}`);
      });
  };

  return (
    <>
      <header>
        <h1>Classroom for Teachers</h1>
      </header>
      <main className="classroom-main">
        <button id="add-assignment" type="button" onClick={handleAdd}>Add an assignment</button>
        {adding && (
        <div className="add-assignment">
          <form className="assignment-form" onSubmit={handleSubmit}>
            <label htmlFor="nameBox">
              Assignment Name
              <br />
              <input id="nameBox" name="name" type="text" placeholder="Assignment" onChange={(e) => setName(e.target.value)} />
            </label>
            <br />
            <br />
            <label htmlFor="descBox">
              Description:
              <br />
              <input id="descBox" name="description" type="text" onChange={(e) => setDesc(e.target.value)} />
            </label>
            <br />
            <br />
            <label htmlFor="dueBox">
              Due Date:
              <br />
              <input id="dueBox" name="due Date" type="text" onChange={(e) => setDue(e.target.value)} />
            </label>
            <br />
            <br />
            <label htmlFor="assignSubmit">
              <input className="submit" id="assignSubmit" type="submit" />
            </label>
          </form>
          <br />
          <button type="button" onClick={addDone}>Cancel</button>
          <br />
        </div>
        )}
        <div className="assignment-container">
          {aElems}
        </div>
        <br />
        <Link to="/app/Teacher">
          <button type="button">
            Re-render to test auth!
          </button>
        </Link>
      </main>
    </>
  );
}
