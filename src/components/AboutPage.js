import React from 'react';
import styled from 'styled-components/macro';
import Header from './Header';
import PageContent from './PageContent';

const AboutPageContainer = styled.div``;

const AboutPage = () => {
  return (
    <AboutPageContainer>
      <PageContent>
        <h1>About</h1>
        <p>
          Here we can list info about sponsors, startupGNV, have a FAQ, etc.
        </p>
      </PageContent>
    </AboutPageContainer>
  );
};

export default AboutPage;
