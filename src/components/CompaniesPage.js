import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import { device } from './device';

import AppContext from './AppContext';
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
    color: ${({ theme }) => theme.darkGreen};
    font-weight: 700;
  }
`;

const CompaniesContent = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
`;

const CompaniesMapContainer = styled.div`
  flex: 5;
  margin-top: -20px;

  @media ${device.tabletPort}, ${device.mobile} {
    display: none;
  }
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
  const { jobs, companies, jobsLoading, companiesLoading } = useContext(
    AppContext
  );
  if (companiesLoading || jobsLoading) {
    return <LinearProgress />;
  }

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
