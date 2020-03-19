import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    width: '100%'
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  },
  radioContainer: {
    marginTop: 10,
    padding: '2px 4px',
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  radio: {
    marginLeft: theme.spacing(1)
  }
}));

export const InputWithRadio = ({ placeholder, onSubmit, options }) => {
  const classes = useStyles();
  const [input, setInput] = React.useState('');
  const [parentID, setParentID] = React.useState('');

  const handleSubmit = () => {
    setInput('');
    setParentID('');
    onSubmit(input, parentID);
  };

  return (
    <Paper className={classes.root}>
      <div className={classes.inputContainer}>
        <InputBase
          value={input}
          onChange={e => setInput(e.target.value)}
          className={classes.input}
          placeholder={placeholder}
          inputProps={{ 'aria-label': placeholder }}
        />
        <Divider className={classes.divider} orientation="vertical" />
        <Button color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
      <div className={classes.radioContainer}>
        {options.map(({ parentID: pID, id }) => (
          <Chip
            key={id}
            label={pID}
            variant="outlined"
            onClick={() =>
              pID === parentID ? setParentID('') : setParentID(pID)
            }
            className={classes.radio}
            color={pID === parentID ? 'primary' : 'default'}
          />
        ))}
      </div>
    </Paper>
  );
};
