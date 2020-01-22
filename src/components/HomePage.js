import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import AppContext from './AppContext';
import { clearFix } from 'polished';
import { Link } from 'react-router-dom';
import Hero from './Hero';
import JobList from './JobList';
import CompanyList from './CompanyList';
import homeHero from '../assets/images/home-hero.jpg';
import homeFeaturedBG from '../assets/images/home-featured-bg.jpg';

import { LinearProgress } from '@material-ui/core';

const HomePageContainer = styled.div``;

const HeroImage = styled.img`
  display: block;
  flex: 1;
  max-width: 547px;
`;

const HeroContent = styled.div`
  flex: 1;

  h2 {
    font-size: 1rem;
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  h3 {
    font-size: 3rem;
    margin-bottom: 20px;
  }

  p {
    font-size: 0.8rem;
    max-width: 460px;
    line-height: 1.2rem;
    margin-bottom: 10px;
  }

  strong {
    color: ${({ theme }) => theme.teal};
    font-weight: 700;
  }
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
    color: ${({ theme }) => theme.textDark};
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
        <HeroImage src={homeHero} />
        <HeroContent>
          <h2>Welcome to Gainesville</h2>
          <h3>
            Join the fastest growing
            <br />
            tech community in Florida
          </h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            magna et nisl maximus sagittis ac nec nibh. Curabitur posuere leo ac
            eros placerat, in accumsan lorem gravida. Pellentesque arcu tellus,
            tristique id auctor id, pulvinar ut quam. Fusce consectetur iaculis
            nunc ac sodales. Pellentesque habitant morbi tristique senectus et
            netus et malesuada fames ac turpis egestas. Quisque dictum nulla
            leo. Proin tincidunt fringilla nisi, in scelerisque lacus.
          </p>
          <p>
            Fusce scelerisque magna magna, sed viverra dolor aliquam sed. Nam
            lobortis vehicula dapibus. Integer dolor orci, placerat eu ornare
            sed, facilisis ac tellus. In tempor consectetur odio, scelerisque
            congue sem vulputate lobortis.
          </p>
        </HeroContent>
      </Hero>
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
    </HomePageContainer>
  );
};

export default HomePage;
