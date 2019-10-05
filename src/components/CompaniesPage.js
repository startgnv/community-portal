import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components/macro';
import { useCollection } from 'react-firebase-hooks/firestore';

import { Marker, FlyToInterpolator } from 'react-map-gl';
import { easeCubic } from 'd3-ease';

import { db } from '../firebase';
import Error from './Error';
import MapPin from './MapPin';
import MapContainer from './MapContainer';
import MapPageCompany from './MapPageCompany';
import MapPageCompanies from './MapPageCompanies';
import PageContent from './PageContent';
import Hero from './Hero';

import Sidebar from './Sidebar';
import { LinearProgress } from '@material-ui/core';

const MapPageContainer = styled.div``;

const HeroHeadline = styled.h2`
  font-size: 46px;
  color: white;

  strong {
    color: ${({ theme }) => theme.teal};
    font-weight: 700;
  }
`;

const CompaniesContent = styled.div`
  display: flex;
  max-width: 1120px;
  margin: 0 auto;
  padding: 30px 0;
`;

const CompaniesMap = styled.div`
  flex: 5;
  margin-top: -20px;
`;

const CompaniesMapInner = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  padding: 20px 0;
  box-sizing: border-box;

  .active-pin {
    z-index: 1000;
  }
`;

export const MapPage = () => {
  const [companiesValue, companiesLoading, companiesError] = useCollection(
    db.collection('companies')
  );
  const [jobsValue, jobsLoading, jobsError] = useCollection(
    db.collection('jobs')
  );
  const [viewport, setViewport] = useState({
    latitude: 29.6607805656048,
    longitude: -82.380708628568,
    zoom: 11
  });
  const [activeCompany, setActiveCompany] = useState('');

  if (companiesError || jobsError) {
    return <Error />;
  }
  if (companiesLoading || jobsLoading) {
    return <LinearProgress />;
  }

  const companies = companiesValue.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  const jobs = jobsValue.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  const onViewportChange = newViewport => {
    const viewport = {
      ...viewport,
      ...newViewport
    };
    setViewport(viewport);
  };

  const onCompanyMouseEnter = ({ id, coordinates }) => {
    onViewportChange({
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      zoom: 13,
      transitionDuration: 500,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: easeCubic
    });
    setActiveCompany(id);
  };

  return (
    <MapPageContainer>
      <Hero size="medium">
        <HeroHeadline>
          Meet the companies <strong>shaping Gainesville.</strong>
        </HeroHeadline>
      </Hero>
      <CompaniesContent>
        <Route
          exact
          path="/companies"
          component={({ match, ...props }) => {
            return (
              <MapPageCompanies
                {...props}
                companies={companies}
                jobs={jobs}
                onCompanyMouseEnter={onCompanyMouseEnter}
              />
            );
          }}
        />
        <Route
          exact
          path="/companies/:company"
          component={({
            match: {
              params: { company }
            },
            match,
            ...props
          }) => {
            const companyMatch = companies.find(({ slug }) => company === slug);
            const filteredJobs = jobs.filter(job => {
              return job.companyID === companyMatch.id;
            });
            return (
              <MapPageCompany
                {...props}
                match={match}
                company={companyMatch}
                jobs={filteredJobs}
              />
            );
          }}
        />
        <CompaniesMap>
          <CompaniesMapInner>
            <MapContainer
              viewport={viewport}
              onViewportChange={onViewportChange}
            >
              {companies
                .filter(({ coordinates }) => coordinates)
                .map(
                  ({
                    id,
                    name,
                    coordinates: { latitude, longitude },
                    slug
                  }) => (
                    <Marker
                      key={name}
                      longitude={longitude}
                      latitude={latitude}
                      className={activeCompany === id ? 'active-pin' : ''}
                    >
                      <MapPin
                        linkTo={'/companies/' + slug}
                        size={36}
                        active={activeCompany === id}
                      />
                    </Marker>
                  )
                )}
            </MapContainer>
          </CompaniesMapInner>
        </CompaniesMap>
      </CompaniesContent>
    </MapPageContainer>
  );
};

export default MapPage;
