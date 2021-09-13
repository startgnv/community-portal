import React from 'react';
import firebase, { auth } from '../../src/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { LinearProgress } from '@material-ui/core';
import { useRouter } from 'next/router';


export const LoginPage = () => {
  const [user, initialising] = useAuthState(auth);
  const router = useRouter();

  if (user) {
    router.push('/admin');
    return null;
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
