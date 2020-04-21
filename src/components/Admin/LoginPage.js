import React from 'react';
import { Redirect } from 'react-router-dom';
import firebase, { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { LinearProgress } from '@material-ui/core';

export const LoginPage = ({
  location: { state: { from } = { from: { pathname: '/admin' } } }
}) => {
  const [user, initialising] = useAuthState(auth);

  if (user) {
    return <Redirect to={from} />;
  }

  if (initialising) {
    return <LinearProgress />;
  }

  const onClick = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <div>
      <button onClick={onClick}>Login</button>
    </div>
  );
};

export default LoginPage;
