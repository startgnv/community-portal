import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    },

    display: 'flex',
    justifyContent: 'center'
  },
  input: {
    display: 'none'
  },
  thumbnail: {
    width: '100%'
  }
}));

const ThumbnailUpload = ({ onChange, defaultValue }) => {
  const classes = useStyles();

  // Stores the file as a base-64 encoded string, to display in the img
  const [fileBase64, setFileBase64] = React.useState('');

  const handleInput = e => {
    e.preventDefault();

    const blob = e.target.files.item(0);

    if (FileReader && blob) {
      // Update the file path
      const reader = new FileReader();
      reader.onload = () => setFileBase64(reader.result);
      reader.readAsDataURL(blob);

      // Send the blob to the parent component
      onChange(blob);
    }
  };

  return (
    <>
      <div className={classes.root}>
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          type="file"
          onChange={handleInput}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            <PhotoCamera style={{ marginRight: '10px' }} />
            Upload Thumbnail
          </Button>
        </label>
        <input
          accept="image/*"
          className={classes.input}
          id="icon-button-file"
          type="file"
        />
      </div>

      {(fileBase64 || defaultValue) && (
        <img
          src={fileBase64 ? fileBase64 : defaultValue}
          alt="Thumbnail"
          className={classes.thumbnail}
        />
      )}
    </>
  );
};

export default ThumbnailUpload;
