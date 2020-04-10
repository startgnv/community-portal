import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

const DeleteDialog = ({ label, message, onConfirm, open, setClose }) => {
  const clear = () => setClose(false);

  const handleDelete = () => {
    clear();
    onConfirm();
  };

  return (
    <Dialog open={open} onClose={clear}>
      <DialogTitle>Delete {label}?</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={clear} color="primary" autoFocus>
          Cancel
        </Button>
        <Button onClick={handleDelete} color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
