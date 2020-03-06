import React from 'react';
import styled from 'styled-components/macro';
import { clearFix } from 'polished';
import PageContent from './PageContent';
import Hero from './Hero';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import uf from '../assets/images/sponsors/uf.png';
import sharpspring from '../assets/images/sponsors/sharpspring.png';
import fracture from '../assets/images/sponsors/fracture.png';
import infotech from '../assets/images/sponsors/infotech.png';
import infiniteenergy from '../assets/images/sponsors/infiniteenergy.png';
import digitalbrands from '../assets/images/sponsors/digitalbrands.png';
import chamber from '../assets/images/sponsors/chamber.png';
import feathr from '../assets/images/sponsors/feathr.png';
import opie from '../assets/images/sponsors/opiesoftware.jpg';
import gville from '../assets/images/sponsors/gville-logo.png';
import { Helmet } from 'react-helmet';

const AboutPageContainer = styled.div`
  .sponsor-img {
    background-size: 80%;
    height: 200px;
  }
`;

const Sponsors = styled.div`
  margin-right: -30px;
  ${clearFix()}

  h3 {
    margin-bottom: 20px;
  }
`;

const CardContainer = styled.div`
  width: ${100 / 3}%;
  padding: 0 30px 30px 0;
  float: left;
  box-sizing: border-box;
`;

const HeroHeadline = styled.h2`
  font-size: 46px;
  color: white;
`;

const HeroContent = styled.div`
  position: relative;
  max-width: 725px;
  margin: 0 auto;
  padding: 120px 0;
  text-align: center;
`;

const AboutPage = () => (
  <>
    <Helmet>
      <title>About startGNV</title>
      <meta
        name="description"
        content="startGNV is an initiative by startupGNV to promote and grow the Gainesville startup, tech, and biotech communities."
      />
      <meta name="og:title" property="og:title" content="About startGNV" />
      <meta
        name="og:description"
        property="og:description"
        content="startGNV is an initiative by startupGNV to promote and grow the Gainesville startup, tech, and biotech communities."
      />
      <meta property="og:type" content="website" />
    </Helmet>
    <AboutPageContainer>
      <Hero>
        <HeroHeadline>About</HeroHeadline>
      </Hero>
      <PageContent>
        <HeroContent>
          <h3>Mission</h3>
          <p>
            startGNV is an initiative by startupGNV dedicated to growing the
            Gainesville startup, tech, and biotech communities.
          </p>
        </HeroContent>
        <Sponsors>
          <h3>Sponsors</h3>
          <CardContainer>
            <Card className="sponsor-card">
              <CardMedia
                className="sponsor-img"
                image={uf}
                title="University of Florida"
              />
            </Card>
          </CardContainer>
          <CardContainer>
            <Card className="sponsor-card">
              <CardMedia
                className="sponsor-img"
                image={gville}
                title="City of Gainesville"
              />
            </Card>
          </CardContainer>
          <CardContainer>
            <Card className="sponsor-card">
              <CardMedia
                className="sponsor-img"
                image={sharpspring}
                title="Sharpspring"
              />
            </Card>
          </CardContainer>
          <CardContainer>
            <Card className="sponsor-card">
              <CardMedia
                className="sponsor-img"
                image={fracture}
                title="Fracture"
              />
            </Card>
          </CardContainer>
          <CardContainer>
            <Card className="sponsor-card">
              <CardMedia
                className="sponsor-img"
                image={infotech}
                title="InfoTech"
              />
            </Card>
          </CardContainer>
          <CardContainer>
            <Card className="sponsor-card">
              <CardMedia
                className="sponsor-img"
                image={infiniteenergy}
                title="Infinite Energy"
              />
            </Card>
          </CardContainer>
          <CardContainer>
            <Card className="sponsor-card">
              <CardMedia
                className="sponsor-img"
                image={digitalbrands}
                title="Digital Brands"
              />
            </Card>
          </CardContainer>
          <CardContainer>
            <Card className="sponsor-card">
              <CardMedia
                className="sponsor-img"
                image={chamber}
                title="Gainesville Chamber of Commerce"
              />
            </Card>
          </CardContainer>
          <CardContainer>
            <Card className="sponsor-card">
              <CardMedia
                className="sponsor-img"
                image={feathr}
                title="Feathr"
              />
            </Card>
          </CardContainer>
          <CardContainer>
            <Card className="sponsor-card">
              <CardMedia
                className="sponsor-img"
                image={opie}
                title="OPIE Softwares"
              />
            </Card>
          </CardContainer>
        </Sponsors>
      </PageContent>
    </AboutPageContainer>
  </>
);

export default AboutPage;
