import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';

export default function AssignmentCard(props) {
  return (
    <>
      <p><strong>{props.name}</strong></p>
      <p>{props.desc}</p>
      <p>Due: {props.due}</p>
    </>
  );
}
