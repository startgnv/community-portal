import React from 'react';
import styled from 'styled-components/macro';
import PageContent from './PageContent';

const EcosystemPageContainer = styled.div``;

const EcosystemPage = () => (
  <EcosystemPageContainer>
    <PageContent>
      <h1>Ecosystem</h1>
      <p>
        Here we can list info about support system for Gainesville tech
        companies and startups and other cool stuff.
      </p>
    </PageContent>
  </EcosystemPageContainer>
);

export default EcosystemPage;
