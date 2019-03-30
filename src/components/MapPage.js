import React, { useState } from 'react';
import { Route } from 'react-router-dom';

import { Marker } from 'react-map-gl';

import MapPin from './MapPin';
import MapContainer from './MapContainer';
import { MapPageCompany } from './MapPageCompany';
import { MapPageIndex } from './MapPageIndex';

const defaultCenter = {
  latitude: 29.651634,
  longitude: -82.384829
};

export const MapPage = ({
  match: {
    params: { company }
  },
  companies = []
}) => {
  const currentCompany = companies.find(({ name }) => name === company);
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
        {companies.map(({ name, latitude, longitude }) => (
          <Marker key={name} longitude={longitude} latitude={latitude}>
            <MapPin />
          </Marker>
        ))}
      </MapContainer>
      <Route
        exact
        path="/"
        component={props => (
          <MapPageIndex
            {...props}
            companies={companies}
            onFocusChange={onFocusChange}
          />
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
            company={companies.find(({ name }) => company === name)}
          />
        )}
      />
    </>
  );
};

export default MapPage;
