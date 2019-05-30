import React from 'react';
import { Redirect } from 'react-router-dom';
import { auth } from '../firebase';
import firebase from 'firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import { LinearProgress } from '@material-ui/core';

export const AdminLogin = ({
  location: { state: { from } = { from: { pathname: '/admin' } } }
}) => {
  const [user, initialising, error] = useAuthState(auth);

  if (user) {
    return <Redirect to={from} />;
  }

  if (initialising) {
    return <LinearProgress />;
  }

  const onClick = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };
  return (
    <div>
      <button onClick={onClick}>Login</button>
    </div>
  );
};
