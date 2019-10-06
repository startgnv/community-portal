import React, { useState } from 'react';
import MapContainer from './MapContainer';
import { SharedMapConsumer } from './CompaniesMapContext';
import MapPin from './MapPin';
import { Marker } from 'react-map-gl';

const CompaniesMap = ({ companies }) => {
  const [viewport, setViewport] = useState({
    latitude: 29.70078999971,
    longitude: -82.380708628568,
    zoom: 10
  });
  const onViewportChange = newViewport => {
    const viewport = {
      ...viewport,
      ...newViewport
    };
    setViewport(viewport);
  };
  return (
    <MapContainer viewport={viewport} onViewportChange={onViewportChange}>
      <SharedMapConsumer>
        {({ activeCompanyID }) =>
          companies
            .filter(({ coordinates }) => coordinates)
            .map(({ id, name, coordinates: { latitude, longitude }, slug }) => (
              <Marker
                key={name}
                longitude={longitude}
                latitude={latitude}
                className={activeCompanyID === id ? 'active-pin' : ''}
              >
                <MapPin
                  linkTo={'/companies/' + slug}
                  size={36}
                  active={activeCompanyID === id}
                />
              </Marker>
            ))
        }
      </SharedMapConsumer>
    </MapContainer>
  );
};

export default CompaniesMap;
