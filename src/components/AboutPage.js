import React from 'react';
import styled from 'styled-components/macro';
import { clearFix } from 'polished';
import PageContent from './PageContent';
import Hero from './Hero';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import { Helmet } from 'react-helmet';

//Sponsors
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

//Board Members
import aidan from '../assets/images/board/aidan.jpeg';
import benny from '../assets/images/board/benny.jpeg';
import bryan from '../assets/images/board/bryan.jpeg';
import elliot from '../assets/images/board/elliot.png';
import empty from '../assets/images/board/empty.png';
import gregg from '../assets/images/board/gregg.jpeg';
import hannah from '../assets/images/board/hannah.jpeg';
import james from '../assets/images/board/james.png';
import lindsey from '../assets/images/board/lindsey.jpeg';
import melissa from '../assets/images/board/melissa.jpeg';
import mikayla from '../assets/images/board/mikayla.png';
import seyi from '../assets/images/board/seyi.jpeg';
import will from '../assets/images/board/will.jpeg';
import curtis from '../assets/images/board/curtis.jpg';

const boardMembers = [
  {
    name: 'Aidan Augustin',
    img: aidan
  },
  {
    name: 'Benny Torres',
    img: benny
  },
  {
    name: 'Bryan Tobin',
    img: bryan
  },
  {
    name: 'Elliot Welker',
    img: elliot
  },
  {
    name: 'Curtis McMillen',
    img: empty
  },
  {
    name: 'Hannah Yeargan',
    img: hannah
  },
  {
    name: 'Gregg Robinson',
    img: gregg
  },
  {
    name: 'James Gibson',
    img: james
  },
  {
    name: 'Lindsey Day',
    img: lindsey
  },
  {
    name: 'Melissa White',
    img: melissa
  },
  {
    name: 'Mikayla Dawn',
    img: mikayla
  },
  {
    name: 'Seyi Oluwaleimu',
    img: seyi
  },
  {
    name: 'William Richardson',
    img: will
  },
  {
    name: 'Curtis McMillen',
    img: curtis
  }
];

const programs = [
  {
    title: 'Startup Sprint',
    description:
      'Part hackathon, part business pitch competition. Launch a new startup over the weekend! This immersive event offers working professionals, entrepreneurs, and students alike the opportunity to work on a startup idea over the course of a weekend, ending with a "Shark Tank" style pitch for prizes.'
  },
  {
    title: 'Josh Greenberg Day',
    description:
      'Josh Greenberg was a startup pioneer who changed the landscape of Gainesville’s entrepreneurship scene forever. As a selfless visionary and leader, Josh elevated what it meant to create and give - And on April 17, our growing community gathers to celebrate his spirit and mission: to continue to move Gainesville’s needle and create a city and community where startups thrive. Onward & Upward!'
  },
  {
    title: 'celebrateGNV',
    description:
      "Celebrate the successes of startGNV land the local innovation community over dinner and drinks. Recognize early stage startups that compete in Cox's pitch competition Startup Showcase."
  },
  {
    title: "Founders' Dinner Series",
    description:
      'Late and early stage founders get together over dinner to talk about their successes, failures, and how they can help each other and startGNV grow the innovation community.'
  },
  {
    title: 'Barcamp',
    description:
      'BarCamp GNV is a one-day gathering where technology-loving Gainesville locals get together and share their experiences.'
  }
];

const AboutPageContainer = styled.div`
  .sponsor-img {
    background-size: 80%;
    height: 200px;
  }
`;

const HeroHeadline = styled.h2`
  font-size: 46px;
  color: white;
`;

const HeroContent = styled.div`
  position: relative;
  max-width: 725px;
  margin: 0 auto;
  padding: 60px 0;
  text-align: center;
`;

const Sponsors = styled.div`
  margin: 0 -30px 60px 0;
  ${clearFix()}

  h3 {
    margin-bottom: 20px;
  }
`;

const Programs = styled.div`
  margin: 0 -30px 60px 0;
  ${clearFix()}

  h3 {
    margin-bottom: 20px;
  }
`;

const Program = styled.div`
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 3px 0 13px 0 rgba(0, 0, 0, 0.15);
  background: white;
  transition: 200ms;
  cursor: pointer;
  border-radius: 3px;
  ${clearFix()}

  &:hover {
    box-shadow: 3px 3px 13px 0 rgba(0, 0, 0, 0.15);
    transform: scale(1.04);
    transform-origin: center;
  }
`;

const Board = styled.div`
  margin-right: -30px;
  ${clearFix()}

  h3 {
    margin-bottom: 20px;
  }
`;

const CardContainer = styled.div`
  width: ${100 / 5}%;
  padding: 0 30px 30px 0;
  float: left;
  box-sizing: border-box;
`;

const BoardMember = styled.div`
  width: ${100 / 4}%;
  padding: 0 60px 60px 0;
  float: left;
  box-sizing: border-box;
  text-align: center;

  .board-avatar {
    width: 100%;
    height: auto;
    margin-bottom: 15px;
  }

  .member-name {
    font-size: 1.4rem;
  }
`;

const AboutPage = () => (
  <>
    <Helmet>
      <title>About startGNV</title>
      <meta
        name="description"
        content="startGNV is a 501(c)(3) dedicated to fostering and growing the Gainesville innovation community."
      />
      <meta name="og:title" property="og:title" content="About startGNV" />
      <meta
        name="og:description"
        property="og:description"
        content="startGNV is a 501(c)(3) dedicated to fostering and growing the Gainesville innovation community."
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
            startGNV is a 501(c)(3) dedicated to fostering and growing the
            Gainesville innovation community.
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
        <Programs>
          <h3>Programs</h3>
          {programs.map(program => (
            <Program>
              <h4>{program.title}</h4>
              <p>{program.description}</p>
            </Program>
          ))}
        </Programs>
        <Board>
          <h3>Board Members</h3>
          {boardMembers.map(member => (
            <BoardMember>
              <Avatar
                className="board-avatar"
                src={member.img}
                alt={member.name}
              />
              <span className="member-name">{member.name}</span>
            </BoardMember>
          ))}
        </Board>
      </PageContent>
    </AboutPageContainer>
  </>
);

export default AboutPage;
