import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export const AdminRoute = ({ component: Component, ...rest }) => {
  const { initialising, user } = useAuthState(auth);
  if (initialising) {
    return <Route {...rest} render={props => <div>Loading...</div>} />;
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
