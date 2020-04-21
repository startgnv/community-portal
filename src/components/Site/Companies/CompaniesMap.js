import React, { useState } from 'react';
import MapContainer from '../UI/MapContainer';
import { SharedMapConsumer } from './CompaniesMapContext';
import MapPin from '../UI/MapPin';
import { Marker } from 'react-map-gl';

const CompaniesMap = ({ companies }) => {
  const [viewport, setViewport] = useState({
    latitude: 29.70078999971,
    longitude: -82.380708628568,
    zoom: 10
  });
  const onViewportChange = newViewport => {
    const vp = {
      ...viewport,
      ...newViewport
    };
    setViewport(vp);
  };
  return (
    <MapContainer viewport={viewport} onViewportChange={onViewportChange}>
      <SharedMapConsumer>
        {({ activeCompanyID }) =>
          companies
            .filter(({ coordinates }) => coordinates)
            // Order determines z-index for pins, this prevents pins from overlapping info boxes
            .sort((a, b) => a.coordinates.latitude - b.coordinates.latitude)
            .map(company => (
              <Marker
                key={company.name}
                longitude={company.coordinates.longitude}
                latitude={company.coordinates.latitude}
                className={activeCompanyID === company.id ? 'active-pin' : ''}
              >
                <MapPin
                  linkTo={'/companies/' + company.slug}
                  size={36}
                  active={activeCompanyID === company.id}
                  company={company}
                />
              </Marker>
            ))
        }
      </SharedMapConsumer>
    </MapContainer>
  );
};

export default CompaniesMap;
