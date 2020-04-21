import React from 'react';
import Select from 'react-select/async';

const promiseOptions = value =>
  fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=${
      process.env.REACT_APP_MAPBOX_KEY
    }&types=address&bbox=-82.56493839266746%2C29.53811960021882%2C-82.12170300631362%2C29.78994550073395`
  )
    .then(res => res.json())
    .then(({ features }) =>
      features.map(({ place_name, center }) => ({
        place_name,
        center
      }))
    );

export const GeocodingInput = props => {
  return (
    <Select
      {...props}
      cacheOptions={true}
      getOptionValue={({ center }) => center}
      getOptionLabel={({ place_name }) => place_name}
      loadOptions={promiseOptions}
    />
  );
};

export default GeocodingInput;
