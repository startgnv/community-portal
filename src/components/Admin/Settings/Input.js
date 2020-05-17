import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
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
  }
}));

export const Input = ({ onSubmit, placeholder }) => {
  const classes = useStyles();
  const [input, setInput] = React.useState('');

  const handleSubmit = () => {
    setInput('');
    onSubmit(input);
  };

  return (
    <Paper className={classes.root}>
      <InputBase
        value={input}
        onChange={e => setInput(e.target.value)}
        className={classes.input}
        placeholder={placeholder}
        inputProps={{ 'aria-label': 'add an industry' }}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <Button color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Paper>
  );
};
