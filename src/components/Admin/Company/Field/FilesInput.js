import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Photos } from '../Photos';

const FilesInput = ({ setFiles, setPhotosToDelete, defaultValues }) => {
  // Since the value of a file input is read-only, its an uncontrolled component
  // Thus, we have to access/modify the files through a ref
  const fileInput = React.useRef();

  // Stores the file as a base-64 encoded string, to display in the img
  const [filesBase64, setFilesBase64] = React.useState(defaultValues || []);

  const onChange = e => {
    e.preventDefault();

    const files = [];

    if (FileReader && e.target.files) {
      for (let file of e.target.files) {
        files.push(file);
        const reader = new FileReader();
        reader.onload = () =>
          setFilesBase64(prevState => [...prevState, reader.result]);
        reader.readAsDataURL(file);
      }

      // Send the blob to the parent component
      setFiles(files);
    }
  };

  const removePhoto = (url, index) => {
    fileInput.current.value = '';
    setFilesBase64(prevState => prevState.filter((_, i) => i !== index));

    // We only need to mark a file for deletion in firebase if it was passed
    // as a default value, otherwise we know it was uploaded locally
    if (defaultValues && defaultValues.includes(url)) {
      setPhotosToDelete(prevState => [...prevState, url]);
    }
  };

  return (
    <>
      <Grid item container justifyContent="center">
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="contained-button-file"
          multiple
          type="file"
          onChange={onChange}
          ref={fileInput}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Upload Photos
          </Button>
        </label>
      </Grid>
      <Grid item container justifyContent="flex-end">
        {filesBase64.length > 0 && (
          <Photos photoURLs={filesBase64 || []} onDelete={removePhoto} />
        )}
      </Grid>
    </>
  );
};

export default FilesInput;
