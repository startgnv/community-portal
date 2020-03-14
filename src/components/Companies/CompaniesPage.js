import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import { device } from '../device';
import AppContext from '../AppContext';
import CompaniesList from './CompaniesList';
import CompaniesMap from './CompaniesMap';
import { SharedMapProvider } from './CompaniesMapContext';
import Hero from '../Hero';
import { Helmet } from 'react-helmet';
import _ from 'lodash';

import { LinearProgress } from '@material-ui/core';

const Container = styled.main``;

const ContentContainer = styled.div`
  display: flex;
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

export const CompaniesPage = () => {
  const { jobs, companies, jobsLoading, companiesLoading } = useContext(
    AppContext
  );
  if (companiesLoading || jobsLoading) {
    return <LinearProgress />;
  }

  return (
    <>
      <Helmet>
        <title>startGNV - Companies</title>
        <meta name="description" content="startGNV companies in our network" />
        <meta
          name="og:title"
          property="og:title"
          content="startGNV Companies"
        />
        <meta
          name="og:description"
          property="og:description"
          content="startGNV is an initiative by startupGNV to promote and grow the Gainesville startup, tech, and biotech communities."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <Container>
        <Hero title="Tech Companies in GNV" size="medium" maxWidth="none" />
        <SharedMapProvider>
          <ContentContainer>
            <CompaniesList companies={_.shuffle(companies)} jobs={jobs} />
            <CompaniesMapContainer>
              <CompaniesMapInner>
                <CompaniesMap companies={companies} />
              </CompaniesMapInner>
            </CompaniesMapContainer>
          </ContentContainer>
        </SharedMapProvider>
      </Container>
    </>
  );
};

export default CompaniesPage;
