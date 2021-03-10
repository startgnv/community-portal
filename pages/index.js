import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { device } from 'src/components/utils/device';
// import AppContext from 'src/components/AppContext';
import { clearFix } from 'polished';
// import JobList from 'src/components/Site/Jobs/JobList';
// import RecentPosts from 'src/components/Site/Blog/RecentPosts';
import CompanyList from 'src/components/Site/Home/CompanyList';
// import homeHero from '../../../assets/images/home-hero.jpg';
// import homeFeaturedBG from '../../../assets/images/jobs-bg.jpg';
// import circleText from 'src/assets/images/circle-text.png';
import { Helmet } from 'react-helmet';
import { LinearProgress } from '@material-ui/core';
import { useCollection } from 'react-firebase-hooks/firestore';
import firebaseClient from 'src/firebase/client';
// import { getCompanies } from "src/store/companies";


const HomePageContainer = styled.div``;

const HomeHero = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;

  @media ${device.tabletPort}, ${device.mobile} {
    margin-top: 0;
    flex-direction: column;
  }
`;

const HeroImage = styled.div`
  position: relative;
  flex: 1;
  background-image: url("/assets/images/home-hero.jpg");
  background-size: cover;
  background-position: center;

  @media ${device.tabletPort}, ${device.mobile} {
    width: 100%;
    min-height: 160px;
  }
`;

const CircleText = styled.img`
  position: absolute;
  top: -20px;
  right: -40px;
  opacity: 0.6;

  @media ${device.tabletPort}, ${device.mobile} {
    top: auto;
    bottom: -40px;
    right: 20px;
  }
`;

const HeroContent = styled.div`
  flex: 1;
  padding: 150px 30px;
  margin-left: 80px;

  h2 {
    font-size: 3.4rem;
    margin-bottom: 20px;

    strong {
      position: relative;
      display: inline-block;
      z-index: 1;
      color: ${({ theme }) => theme.textDark};
      font-weight: 400;

      &:after {
        display: block;
        position: absolute;
        left: -5px;
        right: -5px;
        top: 60%;
        bottom: 0;
        background-color: ${({ theme }) => theme.lightBlue};
        z-index: -1;
        content: '';
      }
    }
  }

  h3 {
    font-size: 16px;
    letter-spacing: 0.2rem;
    text-transform: uppercase;
    margin-bottom: 35px;
    font-family: benton-sans-wide;
    font-weight: 500;
  }

  p {
    font-size: 26px;
    max-width: 480px;
    line-height: 1.8rem;
    margin-bottom: 20px;
  }

  strong {
    color: ${({ theme }) => theme.teal};
    font-weight: 700;
  }

  @media ${device.tabletPort}, ${device.mobile} {
    padding: 30px;
    margin-left: 0;

    h2 {
      font-size: 2rem;
    }

    h3 {
      font-size: 0.8rem;
    }

    p {
      max-width: none;
      font-size: 1.2rem;
    }
  }
`;

const RecentBlogPostsContainer = styled.div`
  padding: 60px;
  display: flex;
  justify-content: center;
  flex-flow: column nowrap;
  max-width: 1080px;
  margin: auto;

  @media ${device.tabletPort}, ${device.mobile} {
    padding: 20px;
  }
`;

const FeaturedContainer = styled.div`
  padding: 60px 20px;
  background-image: url("/assets/images/jobs-bg.jpg");
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
    font-size: 16px;
    font-family: 'Montserrat';
    font-weight: bold;
    text-transform: uppercase;
  }

  a {
    display: block;
    float: right;
    height: 30px;
    line-height: 30px;
    font-size: 13px;
    font-family: 'Montserrat';
    font-weight: bold;
    text-transform: uppercase;
    text-decoration: none;
    color: ${({ theme }) => theme.orange};
  }
`;

const HomePage = () => {
  // const context = useContext(AppContext);
  // console.log(context);
  // const { jobs, companies, jobsLoading, companiesLoading } = useContext(
  //   AppContext
  // );

  // if (companiesLoading || jobsLoading) {
  //   return <LinearProgress />;
  // }

  // const renderCompanies = _.shuffle(
  //   companies.filter(company => company.featured)
  // );

  // const renderJobs = _.shuffle(jobs.filter(j => j.featured));

  // const [companies, setCompanies] = useState([]);

  // useEffect(() =>  {
  //   async function init() {
  //     const c = await getCompanies();
  //     console.log(c);
  //   }

  //   init();
  // }, []);

  const [value, loading, error] = useCollection(
    firebaseClient.firestore().collection('companies'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  function getCompanies(docs) {
    const companies = docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const renderCompanies = _.shuffle(
      companies.filter(company => company.featured)
    );
    console.log(companies);
console.log(renderCompanies);
    if (renderCompanies.length > 6) return renderCompanies.slice(0, 6);
    return renderCompanies;
  }

  return (
    <>
      <Helmet>
        <title>
          startGNV - Gainesville's Startup, Tech, and Biotech Community
        </title>
        <meta
          name="description"
          content="startGNV is an initiative by startupGNV to promote and grow the Gainesville startup, tech, and biotech communities."
        />
        <meta
          name="og:title"
          property="og:title"
          content="startGNV - Gainesville's Startup, Tech, and Biotech Community"
        />
        <meta
          name="og:description"
          property="og:description"
          content="startGNV is an initiative by startupGNV to promote and grow the Gainesville startup, tech, and biotech communities."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <HomePageContainer>
        <HomeHero>
          <HeroImage>
            <CircleText src={"/assets/images/circle-text.png"} />
          </HeroImage>
          <HeroContent>
            <h2>
              Start exploring Gainesville’s <strong>innovation spheres.</strong>
            </h2>
            <h3>Welcome to startGNV</h3>
            <p>
              Whether you are looking for a new meetup, promoting your
              innovative company, or finding a new position in GNV we want to
              help.
            </p>
            <p>Whatever journey it is. Whatever sphere it’s in.</p>
            <p>Start with us.</p>
          </HeroContent>
        </HomeHero>
        <RecentBlogPostsContainer>
          <FeaturedHeadline>
            <h3>StartGNV Blog</h3>
            {/* <Link to="/blog">View All</Link> */}
          </FeaturedHeadline>
          <div>
            {/* <RecentPosts limit={4} /> */}
          </div>
        </RecentBlogPostsContainer>
        <FeaturedContainer>
          <FeaturedSection>
            <FeaturedHeadline>
              <h3>Featured Companies</h3>
              {/* <Link to="/companies">View All</Link> */}
            </FeaturedHeadline>
            {
              !loading && !error && (
                <CompanyList
                  companies={getCompanies(value.docs)}
                  showTitle={false}
                />
              )
            }
            
          </FeaturedSection>
          <FeaturedSection>
            <FeaturedHeadline>
              <h3>Featured Jobs</h3>
              {/* <Link to="/jobs">View All</Link> */}
            </FeaturedHeadline>
            {/* <JobList
              jobs={renderJobs.length > 3 ? renderJobs.slice(0, 3) : renderJobs}
              companies={companies}
              title=""
            /> */}
          </FeaturedSection>
        </FeaturedContainer>
      </HomePageContainer>
    </>
  );
};

export default HomePage;

