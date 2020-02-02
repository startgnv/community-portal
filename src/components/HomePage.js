import _ from 'lodash';
import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import AppContext from './AppContext';
import { clearFix } from 'polished';
import { Link } from 'react-router-dom';
import Hero from './Hero';
import JobList from './JobList';
import RecentBlogPosts from './RecentBlogPosts';
import CompanyList from './CompanyList';
import homeHero from '../assets/images/home-hero.jpg';
import homeFeaturedBG from '../assets/images/jobs-bg.jpg';
import circleText from '../assets/images/circle-text.png';

import { LinearProgress } from '@material-ui/core';

const HomePageContainer = styled.div``;

const HomeHero = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
`;

const HeroImage = styled.div`
  position: relative;
  flex: 1;
  background-image: url(${homeHero});
  background-size: cover;
  background-position: center;
`;

const CircleText = styled.img`
  position: absolute;
  top: -20px;
  right: -40px;
  opacity: 0.6;
`;

const HeroContent = styled.div`
  flex: 1;
  padding: 60px 30px 100px;
  margin-left: 80px;

  h2 {
    font-size: 1rem;
    text-transform: uppercase;
    margin-bottom: 20px;
    font-family: benton-sans-wide;
    font-weight: 500;
  }

  h3 {
    font-size: 3rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 1rem;
    max-width: 460px;
    line-height: 1.2rem;
    margin-bottom: 16px;
  }

  strong {
    color: ${({ theme }) => theme.teal};
    font-weight: 700;
  }
`;

const RecentBlogPostsContainer = styled.div`
  padding: 60px;
  display: flex;
  justify-content: center;
`;

const FeaturedContainer = styled.div`
  padding: 60px 0;
  background-image: url(${homeFeaturedBG});
  background-size: cover;
  background-position: center;
`;

const FeaturedSection = styled.div`
  max-width: ${({ theme }) => theme.contentMaxWidth};
  margin: 0 auto;
  margin-bottom: 30px;
  padding: 20px 30px 30px;
  background-color: white;
  border-radius: 3px;
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
    color: ${({ theme }) => theme.orange};
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
      <HomeHero>
        <HeroImage>
          <CircleText src={circleText} />
        </HeroImage>
        <HeroContent>
          <h3>
            Join the most human
            <br />
            tech ecosystem in Florida.
          </h3>
          <h2>Welcome to Gainesville</h2>
          <p>We are always growing, decomposing, and striving even higher.</p>
          <p>It’s in our nature. It IS our nature.</p>
          <p>
            We are building towards the next product launch. We are growing the
            round of funding. We are learning new languages, training for our
            first 5K, and investing in people.
          </p>
          <p>
            We know our flaws. We cherish all our triumphs. And like humans in
            any environment, we are seeking reliability and connection. So... we
            want to meet YOU - human.
          </p>
          <p>
            We want to hire you, support you and count on you to tell us where
            we can be better. We need you in our ecosystem.
          </p>
          <p>
            Join us in our growth, help us fill in the gaps and be you. We’re
            all human, right?
          </p>
        </HeroContent>
      </HomeHero>
      <RecentBlogPostsContainer>
        <RecentBlogPosts limit={4} />
      </RecentBlogPostsContainer>
      <FeaturedContainer>
        <FeaturedSection>
          <FeaturedHeadline>
            <h3>Featured Companies</h3>
            <Link to="/companies">View all Companies</Link>
          </FeaturedHeadline>
          <CompanyList
            companies={_.shuffle(companies).slice(0, 3)}
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
    </HomePageContainer>
  );
};

export default HomePage;
