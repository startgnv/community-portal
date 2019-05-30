import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export const AdminRoute = ({ component: Component, ...rest }) => {
  const [user, initialising, error] = useAuthState(auth);

  if (error) {
    return error;
  }

  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/admin/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};
