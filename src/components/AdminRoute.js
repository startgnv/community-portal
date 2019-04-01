import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import { LinearProgress } from '@material-ui/core';

export const AdminRoute = ({ component: Component, ...rest }) => {
  const [user, initialising] = useAuthState(auth);
  const [value, loading] = useDocumentOnce(
    user && user.email ? db.doc(`admins/${user.email}`) : null
  );

  if (initialising || loading) {
    return <LinearProgress />;
  }
  if (user && (!value || !value.exists)) {
    return 'You are not an admin!';
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

export default AdminRoute;
