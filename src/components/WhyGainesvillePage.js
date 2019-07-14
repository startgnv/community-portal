import React from 'react';
import styled from 'styled-components/macro';
import Header from './Header';
import PageContent from './PageContent';

const WhyGainesvilleContainer = styled.div``;

const WhyGainesvillePage = () => {
  return (
    <WhyGainesvilleContainer>
      <PageContent>
        <h1>Why Gainesville?</h1>
        <p>
          Here we can list info about sponsors, startupGNV, have a FAQ, etc.
        </p>
      </PageContent>
    </WhyGainesvilleContainer>
  );
};

export default WhyGainesvillePage;
