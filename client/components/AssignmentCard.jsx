import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';

export default function AssignmentCard(props) {
  const handleOpen = (e) => {
    e.preventDefault();
    console.log(props.role);
    if(props.role === 'student') {
      console.log(props.id)
      props.setAssignId(props.id);
      props.setAssignName(props.name);
      props.setAssignOpen(props.role);
      props.setInitialBody(props.body);
    } else if (props.role === 'teacher') {
      console.log('still in beta');
    }
  };

  return (
    <>
      {!props.assignOpen && (
        <>
          <p><strong>{props.name}</strong></p>
          <p>{props.desc}</p>
          <p>Due: {props.due}</p>
          <button type="button" onClick={handleOpen}>Open</button>
        </>
      )}
      {/* {props.assignOpen && (
        <>
          <header>
            <h1>Assignment: {props.name}</h1>
          </header>
          <main>
            <h4>Pretend this is a code editor!</h4>
            <textbox />
          </main>
        </>
      )} */}
    </>
  );
}
