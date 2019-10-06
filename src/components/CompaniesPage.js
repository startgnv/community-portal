import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components/macro';
import { useCollection } from 'react-firebase-hooks/firestore';

import { db } from '../firebase';
import Error from './Error';
import CompanyPage from './CompanyPage';
import MapPageCompanies from './MapPageCompanies';
import CompaniesMap from './CompaniesMap';
import { SharedMapProvider } from './CompaniesMapContext';
import Hero from './Hero';

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

const CompaniesMapContainer = styled.div`
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

  return (
    <MapPageContainer>
      <Hero size="medium">
        <HeroHeadline>
          Meet the companies <strong>shaping Gainesville.</strong>
        </HeroHeadline>
      </Hero>
      <SharedMapProvider>
        <CompaniesContent>
          <MapPageCompanies companies={companies} jobs={jobs} />
          <CompaniesMapContainer>
            <CompaniesMapInner>
              <CompaniesMap companies={companies} />
            </CompaniesMapInner>
          </CompaniesMapContainer>
        </CompaniesContent>
      </SharedMapProvider>
    </MapPageContainer>
  );
};

export default MapPage;
