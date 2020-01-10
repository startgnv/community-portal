import React from 'react';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  card: {
    margin: `${theme.spacing(2)}px 0`
  }
}));

export const FormCardPage = ({ title = '', onSubmit = () => {}, children }) => {
  const classes = useStyles();

  return (
    <Container>
      <Card component="form" m={2} className={classes.card} onSubmit={onSubmit}>
        <CardHeader title={title} />
        <CardContent>{children}</CardContent>
      </Card>
    </Container>
  );
};

export default FormCardPage;
