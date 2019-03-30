import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

import { Marker } from 'react-map-gl';

import MapPin from './MapPin';
import MapContainer from './MapContainer';
import { MapPageCompany } from './MapPageCompany';
import { MapPageIndex } from './MapPageIndex';

import Header from './Header';
import Sidebar from './Sidebar';

const MapPageContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  .main-content {
    height: calc(100vh - 70px);
    clear: both;
  }
`;

const defaultCenter = {
  latitude: 29.6499279,
  longitude: -82.3327508
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
    <MapPageContainer>
      <Header />
      <div className="main-content">
        <Sidebar>
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
          <Link to="/admin">Admin</Link>
          <Link to="/">Home</Link>
        </Sidebar>
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
      </div>
    </MapPageContainer>
  );
};

export default MapPage;
