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

export const NewJobForm = ({
  companies = [],
  onSubmit = () => {},
  jobCategories = []
}) => {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [companyID, setCompanyID] = useState('');
  const [applyUrl, setApplyUrl] = useState('');
  const onFormSubmit = e => {
    e.preventDefault();
    onSubmit({ title, description, companyID, applyUrl });
    setTitle('');
    setDescription('');
    setCompanyID('');
    setApplyUrl('');
  };
  return (
    <form onSubmit={onFormSubmit}>
      <TextField
        className={classes.textField}
        value={title}
        onChange={e => setTitle(e.target.value)}
        variant="outlined"
        label="Job Title"
      />
      <TextField
        className={classes.textField}
        label="Description"
        onChange={e => setDescription(e.target.value)}
        value={description}
        variant="outlined"
        multiline
      />
      <TextField
        className={classes.textField}
        select
        label="Company"
        value={companyID}
        onChange={e => setCompanyID(e.target.value)}
        variant="outlined"
        helperText="Select Company"
      >
        {companies.map(company => {
          const { name } = company.data();
          return (
            <MenuItem key={company.id} value={company.id}>
              {name}
            </MenuItem>
          );
        })}
      </TextField>
      <TextField
        className={classes.textField}
        label="Application URL"
        value={applyUrl}
        onChange={e => setApplyUrl(e.target.value)}
        variant="outlined"
      />
      <Button color="primary" type="submit" variant="contained">
        Submit
      </Button>
    </form>
  );
};
