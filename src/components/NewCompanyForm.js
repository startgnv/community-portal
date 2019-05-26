import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
  textField: {
    display: 'block',
    marginBottom: '20px',
    minWidth: '160px'
  }
}));

export const NewCompanyForm = ({ onSubmit = () => {} }) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState(29.6499);
  const [longitude, setLongitude] = useState(-82.332);
  const onFormSubmit = e => {
    e.preventDefault();
    onSubmit({ name, latitude, longitude });
    setName('');
    setLatitude(29.65);
    setLongitude(-83.332);
  };
  return (
    <form onSubmit={onFormSubmit}>
      <TextField
        className={classes.textField}
        value={name}
        onChange={e => setName(e.target.value)}
        label="Name"
        variant="outlined"
      />
      <TextField
        className={classes.textField}
        value={longitude}
        onChange={e => setLongitude(e.target.value)}
        label="Longitude"
        variant="outlined"
      />
      <TextField
        className={classes.textField}
        type="text"
        value={latitude}
        onChange={e => setLatitude(e.target.value)}
        label="Latitude"
        variant="outlined"
      />
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
};
