import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';

const FileInput = ({ label, setFile, alt, defaultValue }) => {
  // Stores the file as a base-64 encoded string, to display in the img
  const [fileBase64, setFileBase64] = React.useState('');

  const onChange = e => {
    e.preventDefault();

    const blob = e.target.files.item(0);

    if (FileReader && blob) {
      // Update the file path
      const reader = new FileReader();
      reader.onload = () => setFileBase64(reader.result);
      reader.readAsDataURL(blob);

      // Send the blob to the parent component
      setFile(blob);
    }
  };

  return (
    <>
      <FormLabel>{label}</FormLabel>
      <input type="file" onChange={onChange} />
      {(fileBase64 || defaultValue) && (
        <img
          alt={alt}
          style={{ height: 'auto', width: 'auto', maxWidth: 300 }}
          src={fileBase64 ? fileBase64 : defaultValue}
        />
      )}
    </>
  );
};

export default FileInput;
