import React from 'react';
import styled from 'styled-components/macro';
import PageContent from './PageContent';
import Hero from './Hero';

const AboutPageContainer = styled.div``;

const HeroHeadline = styled.h2`
  font-size: 46px;
  color: white;
`;

const AboutPage = () => (
  <AboutPageContainer>
    <Hero>
      <HeroHeadline>About</HeroHeadline>
    </Hero>
    <PageContent>
      <h3>Mission</h3>
      <p>Here we can list info about sponsors, startupGNV, have a FAQ, etc.</p>
      <h3>Sponsors</h3>
      <ul>
        <li>Sharpspring</li>
        <li>Fracture</li>
        <li>Feathr</li>
        <li>University of Florida</li>
        <li>City of Gainesville</li>
        <li>Alachua County</li>
      </ul>
    </PageContent>
  </AboutPageContainer>
);

export default AboutPage;
