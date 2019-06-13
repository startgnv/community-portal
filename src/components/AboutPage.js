import React from 'react';
import styled from 'styled-components/macro';
import Header from './Header';

const AboutPageContainer = styled.div``;

const AboutPage = () => {
  return (
    <AboutPageContainer>
      <Header />
      <div className="main-content">
        <h1>About</h1>
        <p>
          Here we can list info about sponsors, startupGNV, have a FAQ, etc.
        </p>
      </div>
    </AboutPageContainer>
  );
};

export default AboutPage;
