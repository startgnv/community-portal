import React, { useState } from 'react';
import { Route } from 'react-router-dom';

import { Marker } from 'react-map-gl';

import MapPin from './MapPin';
import MapContainer from './MapContainer';
import CompanyList from './CompanyList';
import CompanyListItem from './CompanyListItem';

const startups = [
  { name: 'admiral', latitude: 29.6499279, longitude: -82.3327508 },
  { name: 'feathr', latitude: 29.6507837, longitude: -82.3310367 },
  { name: 'shadow', latitude: 29.6500853, longitude: -82.3235237 }
];

const defaultCenter = {
  latitude: 29.651634,
  longitude: -82.384829
};

const MapPageIndex = ({ onFocusChange }) => {
  const [filterText, setFilterText] = useState('');
  const filteredStartups = startups.filter(e =>
    e.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={filterText}
        onChange={e => setFilterText(e.target.value)}
      />
      <CompanyList
        css={`
          max-width: 50%;
        `}
      >
        {filteredStartups.map(company => (
          <CompanyListItem
            company={company}
            onHover={() => onFocusChange(company)}
            key={company.name}
          />
        ))}
      </CompanyList>
    </div>
  );
};

const MapPageCompany = ({ history: { goBack }, company: { name } }) => {
  return (
    <div>
      <button type="button" onClick={goBack}>
        Back
      </button>
      {name}
    </div>
  );
};

export const MapPage = ({
  match: {
    params: { company }
  }
}) => {
  const currentCompany = startups.find(({ name }) => name === company);
  const [viewport, setViewport] = useState(currentCompany || defaultCenter);

  const onFocusChange = ({ latitude, longitude }) =>
    setViewport({
      ...viewport,
      latitude,
      longitude,
      // divide by 2 just to keep things near the center. this won't work for sharpspring
      // latitude: defaultCenter.latitude - (defaultCenter.latitude - latitude)/2,
      // longitude: defaultCenter.longitude - (defaultCenter.longitude - longitude)/2,
      transitionDuration: 500
    });

  return (
    <>
      <MapContainer
        viewport={viewport}
        onViewportChange={viewport => setViewport(viewport)}
      >
        {startups.map(({ name, latitude, longitude }) => (
          <Marker key={name} longitude={longitude} latitude={latitude}>
            <MapPin />
          </Marker>
        ))}
      </MapContainer>
      <Route
        exact
        path="/"
        component={({ match }) => (
          <MapPageIndex match={match} onFocusChange={onFocusChange} />
        )}
      />
      <Route
        exact
        path="/company/:company"
        component={({
          match: {
            params: { company }
          },
          match,
          ...props
        }) => (
          <MapPageCompany
            {...props}
            match={match}
            company={startups.find(({ name }) => company === name)}
          />
        )}
      />
    </>
  );
};

export default MapPage;
