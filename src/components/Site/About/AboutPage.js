import React from 'react';
import styled from 'styled-components/macro';
import { clearFix } from 'polished';
import PageContainer from '../UI/PageContainer';
import Hero from '../UI/Hero';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { Helmet } from 'react-helmet';
import { device } from '../../utils/device';

//Sponsors
import hutchison from '../../../assets/images/sponsors/HutchisonPLLC.png';
import threeFiveTwo from '../../../assets/images/sponsors/ThreeFiveTwo.png';
import opie from '../../../assets/images/sponsors/opiesoftware.jpg';
import feathr from '../../../assets/images/sponsors/feathr.png';
import infoTech from '../../../assets/images/sponsors/infotech.png';
import santeFe from '../../../assets/images/sponsors/sante-fe.png';
import trimark from '../../../assets/images/sponsors/trimark.png';
import betterme from '../../../assets/images/sponsors/betterme.png';
import ps27 from '../../../assets/images/sponsors/ps27.png';
import alertTrace from '../../../assets/images/sponsors/AlertTrace.jpg';
import fcu from '../../../assets/images/sponsors/fcu.jpg';
import sharpspring from '../../../assets/images/sponsors/sharpspring.png';

//Board Members
import aidan from '../../../assets/images/board/aidan.jpeg';
import elliot from '../../../assets/images/board/elliot.png';
import james from '../../../assets/images/board/james.png';
import lindsey from '../../../assets/images/board/lindsey.jpeg';
import melissa from '../../../assets/images/board/melissa.jpeg';
import seyi from '../../../assets/images/board/seyi.jpeg';
import will from '../../../assets/images/board/will.jpeg';
import aaron from '../../../assets/images/board/aarond.jpeg';
import christine from '../../../assets/images/board/christinec.jpeg';
import clara from '../../../assets/images/board/clara.jpeg';
import jasmine from '../../../assets/images/board/jasmineb.jpeg';
import keira from '../../../assets/images/board/keiras.jpeg';
import matthew from '../../../assets/images/board/matthewl.jpeg';
import michelle from '../../../assets/images/board/michelleb.jpeg';
import steve from '../../../assets/images/board/steve.jpeg';

const boardMembers = [
  {
    name: 'James Gibson',
    img: james,
    linkedIn: 'https://www.linkedin.com/in/james-c-gibson/'
  },
  {
    name: 'Aidan Augustin',
    img: aidan,
    linkedIn: 'https://www.linkedin.com/in/aidanaugustin/'
  },
  {
    name: 'Lindsey Day',
    img: lindsey,
    linkedIn: 'https://www.linkedin.com/in/magneticcareers/'
  },
  {
    name: 'Michelle Brownstein',
    img: michelle,
    linkedIn: 'https://www.linkedin.com/in/michelle-brownstein/'
  },
  {
    name: 'Melissa White',
    img: melissa,
    linkedIn: 'https://www.linkedin.com/in/melissamaewhite/'
  },
  {
    name: 'Seyi Oluwaleimu',
    img: seyi,
    linkedIn: 'https://www.linkedin.com/in/oluwaseyi-oluwaleimu-307503142/'
  },
  {
    name: 'William Richardson',
    img: will,
    linkedIn: 'https://www.linkedin.com/in/williamrichardson1/'
  },
  {
    name: 'Aaron Dixon',
    img: aaron,
    linkedIn: 'https://www.linkedin.com/in/aaronbenjamindixon/'
  },
  {
    name: 'Christine Caven',
    img: christine,
    linkedIn: 'https://www.linkedin.com/in/christinecaven/'
  },
  {
    name: 'Jasmine Banks',
    img: jasmine,
    linkedIn: 'https://www.linkedin.com/in/jsbanks/'
  },
  {
    name: 'Clara Edwards',
    img: clara,
    linkedIn: 'https://www.linkedin.com/in/clara-edwards-77161435/'
  },
  {
    name: 'Elliot Welker',
    img: elliot,
    linkedIn: 'https://www.linkedin.com/in/elliottwelker/'
  },
  {
    name: 'Keira Simmonds',
    img: keira,
    linkedIn: 'https://www.linkedin.com/in/keirasimmonds/'
  },
  {
    name: 'Matthew Luedecke',
    img: matthew,
    linkedIn: 'https://www.linkedin.com/in/matthew-luedecke/'
  },
  {
    name: 'Steve Shepard',
    img: steve,
    linkedIn: 'https://www.linkedin.com/in/stephenshepherd/'
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
      "Celebrate the successes of startGNV and the local innovation community over dinner and drinks. Recognize early stage startups that compete in Cox's pitch competition Startup Showcase."
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

  p {
    margin-top: 7px;
  }
`;

const Sponsors = styled.div`
  margin: 0 -30px 60px 0;
  ${clearFix()}

  h3 {
    margin-bottom: 20px;
  }

  @media ${device.mobile} {
    display: flex;
    flex-direction: column;
    align-items: center;
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
  width: 205px;
  padding: 0 30px 30px 0;
  float: left;
  box-sizing: border-box;

  @media ${device.mobile} {
    padding-right: 0;
    width: 100%;
  }
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
    color: #131516;
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
      <PageContainer>
        <HeroContent>
          <h3>Mission</h3>
          <p>
            startGNV is a 501(c)(3) non-profit dedicated to growing the
            innovation ecosystem of Greater Gainesville.
          </p>
        </HeroContent>
        <Sponsors>
          <h3>Annual Partners</h3>
          <CardContainer>
            <Card className="sponsor-card">
              <CardMedia
                className="sponsor-img"
                image={hutchison}
                title="Hutchinson, PLLC"
              />
            </Card>
          </CardContainer>
          <CardContainer>
            <Card className="sponsor-card">
              <CardMedia
                className="sponsor-img"
                image={threeFiveTwo}
                title="Three Five Two, Inc"
              />
            </Card>
          </CardContainer>
          <CardContainer>
            <Card className="sponsor-card">
              <CardMedia
                className="sponsor-img"
                image={opie}
                title="OPIE Software"
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
                image={infoTech}
                title="InfoTech"
              />
            </Card>
          </CardContainer>
          <CardContainer>
            <Card className="sponsor-card">
              <CardMedia
                className="sponsor-img"
                image={santeFe}
                title="Interactive Resources"
              />
            </Card>
          </CardContainer>
          <CardContainer>
            <Card className="sponsor-card">
              <CardMedia
                className="sponsor-img"
                image={trimark}
                title="Trimark Properties"
              />
            </Card>
          </CardContainer>
          <CardContainer>
            <Card className="sponsor-card">
              <CardMedia
                className="sponsor-img"
                image={betterme}
                title="Betterme Productions"
              />
            </Card>
          </CardContainer>
          <CardContainer>
            <Card className="sponsor-card">
              <CardMedia className="sponsor-img" image={ps27} title="PS27" />
            </Card>
          </CardContainer>
          <CardContainer>
            <Card className="sponsor-card">
              <CardMedia
                className="sponsor-img"
                image={alertTrace}
                title="AlertTrace"
              />
            </Card>
          </CardContainer>
          <CardContainer>
            <Card className="sponsor-card">
              <CardMedia className="sponsor-img" image={fcu} title="fcu" />
            </Card>
          </CardContainer>
          <CardContainer>
            <Card className="sponsor-card">
              <CardMedia
                className="sponsor-img"
                image={sharpspring}
                title="SharpSpring"
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
              <a className="member-name" href={member.linkedIn}>
                {member.name}
              </a>
            </BoardMember>
          ))}
        </Board>
      </PageContainer>
    </AboutPageContainer>
  </>
);

export default AboutPage;
