import React from 'react';
import styled from 'styled-components/macro';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import { clearFix } from 'polished';
import { Link } from 'react-router-dom';
import Hero from './Hero';
import PageContent from './PageContent';
import JobList from './JobList';
import CompanyList from './CompanyList';
import Error from './Error';
import phone from '../assets/images/phone.png';

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
  padding: 30px;
  background-color: white;
  border-radius: 3px;
`;

const FeaturedSection = styled.div`
  margin-bottom: 60px;
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
    font-size 13px;
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

const NewContainer = styled.div`
  padding: 30px 80px 40px 0;
  background-color: white;
`;

const NewTitle = styled.h2`
  position: relative;
  display: inline-block;
  font-size: 33px;

  span {
    position: relative;
    z-index: 1;
  }

  &:before {
    position: absolute;
    display: block;
    width: 100%;
    height: 18px;
    bottom: 0;
    right: -16px;
    background-color: ${({ theme }) => theme.yellow};
    content: '';
    z-index: 0;
  }
`;

const NewHeader = styled.div`
  position: relative;
  margin-bottom: -60px;
  z-index: 10;
`;

const NewMainContent = styled.div`
  position: relative;
  max-width: 790px;
  padding: 100px 40px 40px;
  margin-left: 80px;
  background-color: ${({ theme }) => theme.uiBackground};
  z-index: 5;

  h3 {
    margin-bottom: 30px;
    line-height: 56px;
    border-bottom: solid 1px ${({ theme }) => theme.teal};
    font-size: 24px;
    font-weight: bold;
    font-family: 'Montserrat', sans-serif;
    text-transform: uppercase;
  }

  li {
    margin-bottom: 30px;
    font-size: 24px;
    font-weight: bold;
    font-family: 'Montserrat', sans-serif;
    text-transform: uppercase;
  }
`;

const GuideContent = styled.div`
  max-width: 470px;
`;

const MeetupContent = styled.div`
  position: absolute;
  max-height: 400px;
  width: 300px;
  bottom: -60px;
  right: -80px;
  overflow: hidden;

  p {
    position: relative;
    width: 100%;
    padding: 0 20px;
    margin-bottom: 20px;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
    box-sizing: border-box;
  }
`;

const PhoneImg = styled.img`
  display: block;
  width: 300px;
  max-width: 100%;
`;

const HomePage = () => {
  const [jobsValue, jobsLoading, jobsError] = useCollection(
    db.collection('jobs')
  );
  const [companiesValue, companiesLoading, companiesError] = useCollection(
    db.collection('companies')
  );
  if (companiesError || jobsError) {
    return <Error />;
  }
  if (companiesLoading || jobsLoading) {
    return <LinearProgress />;
  }
  const jobs = jobsValue.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  const companies = companiesValue.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  return (
    <HomePageContainer>
      <Hero size="large">
        <HeroStats>150 companies, 7 incubators, XX techies</HeroStats>
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
      <div>
        <PageContent>
          <FeaturedContainer>
            <FeaturedSection>
              <FeaturedHeadline>
                <h3>Featured Companies</h3>
                <Link to="/companies">View all Companies</Link>
              </FeaturedHeadline>
              <CompanyList
                companies={companies.slice(0, 3)}
                showTitle={false}
              />
            </FeaturedSection>
            <FeaturedSection>
              <FeaturedHeadline>
                <h3>Featured Jobs</h3>
                <Link to="/jobs">View all Jobs</Link>
              </FeaturedHeadline>
              <JobList
                jobs={jobs.slice(0, 6)}
                companies={companies}
                showTitle={false}
              />
            </FeaturedSection>
          </FeaturedContainer>
        </PageContent>
      </div>
      <NewContainer>
        <PageContent>
          <NewHeader>
            <NewTitle>
              <span>New To Gainesville?</span>
            </NewTitle>
            <br />
            <NewTitle>
              <span>Start Here</span>
            </NewTitle>
          </NewHeader>
          <NewMainContent>
            <GuideContent>
              <h3>A techie's guide to Gainesville</h3>
              <ul>
                <li>Family friendly weekend happenings</li>
                <li>Gainesville city initiatives</li>
                <li>How to get involved</li>
              </ul>
            </GuideContent>
            <MeetupContent>
              <p>Check out the different Meetups Happening in GNV</p>
              <PhoneImg src={phone} alt="Gainesville Meetups" />
            </MeetupContent>
          </NewMainContent>
        </PageContent>
      </NewContainer>
    </HomePageContainer>
  );
};

export default HomePage;
