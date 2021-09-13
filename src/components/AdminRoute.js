import React, { useEffect } from 'react';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import { LinearProgress } from '@material-ui/core';
import { useRouter } from 'next/router';

export const AdminRoute = ({ component: Component, ...rest }) => {
  const [user, initialising] = useAuthState(auth);
  const [value, loading] = useDocumentOnce(
    user && user.email ? db.doc(`admins/${user.email}`) : null
  );
  const router = useRouter();
  if (initialising || loading) {
    return <LinearProgress />;
  }
  if (user && (!value || !value.exists)) {
    return 'You are not an admin!';
  }
  if (!user && router.pathname !== '/admin/login') {
    router.push('/admin/login');
    return null;
  }
  return <Component {...rest} />;
};

export default AdminRoute;
