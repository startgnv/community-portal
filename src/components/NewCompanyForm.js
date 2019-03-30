import React, { useState } from 'react';
export const NewCompanyForm = ({ onSubmit = () => {} }) => {
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
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Company Name"
      />
      <input
        type="text"
        value={longitude}
        onChange={e => setLongitude(e.target.value)}
        placeholder="Office Longitude"
      />
      <input
        type="text"
        value={latitude}
        onChange={e => setLatitude(e.target.value)}
        placeholder="Office Latitude"
      />
      <button type="submit">Submit</button>
    </form>
  );
};
