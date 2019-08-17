import React from 'react';
import styled from 'styled-components/macro';
import PageContent from './PageContent';

const HomePageContainer = styled.div``;

const HomePage = () => (
  <HomePageContainer>
    <PageContent>
      <h1>Home</h1>
      <p>Welcome</p>
      <p>Stats</p>
      <p>Featured Companies</p>
      <p>Featured Jobs</p>
      <p>News</p>
      <p>Events</p>
      <p>Newsletter Signup</p>
    </PageContent>
  </HomePageContainer>
);

export default HomePage;
