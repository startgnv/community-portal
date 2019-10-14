import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import AppContext from './AppContext';
import { clearFix } from 'polished';
import { Link } from 'react-router-dom';
import Hero from './Hero';
import PageContent from './PageContent';
import JobList from './JobList';
import CompanyList from './CompanyList';

import { LinearProgress } from '@material-ui/core';

const HomePageContainer = styled.div``;

const HeroStats = styled.span`
  display: block;
  font-size: 15px;
  text-transform: uppercase;
  color: white;
  font-weight: bold;
`;

const HeroHeadline = styled.h2`
  font-size: 46px;
  color: white;

  strong {
    color: ${({ theme }) => theme.teal};
    font-weight: 700;
  }
`;

const FeaturedContainer = styled.div`
  max-width: ${({ theme }) => theme.contentMaxWidth};
  margin: 0 auto;
  padding: 30px 0;
`;

const FeaturedSection = styled.div`
  margin-bottom: 30px;
  padding: 20px 30px 30px;
  background-color: white;
  border-radius: 6px;
  box-shadow: 3px 0 13px 0 rgba(0, 0, 0, 0.15);
  ${clearFix()}

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const FeaturedHeadline = styled.div`
  margin-bottom: 20px;
  border-bottom: solid 2px #cccbcc;
  overflow: hidden;

  h3 {
    height: 30px;
    line-height: 30px;
    float: left;
    font-size 16px;
    font-family: 'Montserrat';
    font-weight: bold;
    text-transform: uppercase;
  }

  a {
    display: block;
    float: right;
    height: 30px;
    line-height: 30px;
    font-size 13px;
    font-family: 'Montserrat';
    font-weight: bold;
    text-transform: uppercase;
    text-decoration: none;
    color: ${({ theme }) => theme.purple};
  }
`;

const HomePage = () => {
  const { jobs, companies, jobsLoading, companiesLoading } = useContext(
    AppContext
  );
  if (companiesLoading || jobsLoading) {
    return <LinearProgress />;
  }
  return (
    <HomePageContainer>
      <Hero size="large">
        <HeroHeadline>
          Join the{' '}
          <strong>
            fastest
            <br />
            growing tech
            <br />
            community
          </strong>{' '}
          in Florida
        </HeroHeadline>
      </Hero>
      <PageContent>
        <FeaturedContainer>
          <FeaturedSection>
            <FeaturedHeadline>
              <h3>Featured Companies</h3>
              <Link to="/companies">View all Companies</Link>
            </FeaturedHeadline>
            <CompanyList
              companies={companies.filter(company => company.featured)}
              showTitle={false}
            />
          </FeaturedSection>
          <FeaturedSection>
            <FeaturedHeadline>
              <h3>Featured Jobs</h3>
              <Link to="/jobs">View all Jobs</Link>
            </FeaturedHeadline>
            <JobList
              jobs={jobs.filter(job => job.featured)}
              companies={companies}
              showTitle={false}
            />
          </FeaturedSection>
        </FeaturedContainer>
      </PageContent>
    </HomePageContainer>
  );
};

export default HomePage;
