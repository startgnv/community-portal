import React from 'react';
import { Typography } from '@material-ui/core';

import AdminPageContainer from './AdminPageContainer';

export const AdminIndex = () => (
  <AdminPageContainer>
    <Typography variant="h3">Welcome!</Typography>
  </AdminPageContainer>
);

export default AdminIndex;
