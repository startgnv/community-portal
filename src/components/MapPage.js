import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { useCollection } from 'react-firebase-hooks/firestore';

import { Marker } from 'react-map-gl';

import { db } from '../firebase';
import Error from './Error';
import Loading from './Loading';
import MapPin from './MapPin';
import MapContainer from './MapContainer';
import MapPageCompany from './MapPageCompany';
import MapPageIndex from './MapPageIndex';

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
  }
}) => {
  const { error, loading, value } = useCollection(db.collection('companies'));
  const [viewport, setViewport] = useState(currentCompany || defaultCenter);

  if (error) {
    return <Error />;
  }
  if (loading) {
    return <Loading />;
  }

  const companies = value.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  const currentCompany = companies.find(({ name }) => name === company);

  return (
    <MapPageContainer>
      <Header />
      <div className="main-content">
        <Sidebar>
          <Route
            exact
            path="/"
            render={props => <MapPageIndex {...props} companies={companies} />}
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
          {companies
            .filter(({ coordinates }) => coordinates)
            .map(({ name, coordinates: { latitude, longitude } }) => (
              <Marker
                key={name}
                longitude={longitude}
                latitude={latitude}
                offsetLeft={-15}
                offsetTop={-30}
              >
                <MapPin size="30" />
              </Marker>
            ))}
        </MapContainer>
      </div>
    </MapPageContainer>
  );
};

export default MapPage;
