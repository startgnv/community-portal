import React from 'react';
import styled from 'styled-components/macro';
import { clearFix } from 'polished';
import PageContainer from 'src/components/Site/UI/PageContainer';
import Hero from 'src/components/Site/UI/Hero';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { Helmet } from 'react-helmet';
import { device } from 'src/components/utils/device';

//Sponsors
const sponsors = [
  { name: 'Hutchison, PLLC',  url: '/assets/images/sponsors/HutchisonPLLC.png'},
  { name: 'Three Five Two, Inc',  url: '/assets/images/sponsors/ThreeFiveTwo.png'},
  { name: 'OPIE Software',  url: '/assets/images/sponsors/opiesoftware.jpg'},
  { name: 'Feathr',  url: '/assets/images/sponsors/feathr.png'},
  { name: 'InfoTech',  url: '/assets/images/sponsors/infotech.png'},
  { name: 'Interactive Resources',  url: '/assets/images/sponsors/sante-fe.png'},
  { name: 'Trimark Properties',  url: '/assets/images/sponsors/trimark.png'},
  { name: 'Betterme Productions',  url: '/assets/images/sponsors/betterme.png'},
  { name: 'PS27 Ventures',  url: '/assets/images/sponsors/ps27.png'},
  { name: 'AlertTrace',  url: '/assets/images/sponsors/AlertTrace.jpg'},
  { name: 'fcu',  url: '/assets/images/sponsors/fcu.jpg'},
  { name: 'Sharpspring',  url: '/assets/images/sponsors/sharpspring.png'},
]

const boardMembers = [
  {
    name: 'James Gibson',
    img: '/assets/images/board/james.png',
    linkedIn: 'https://www.linkedin.com/in/james-c-gibson/'
  },
  {
    name: 'Aidan Augustin',
    img: '/assets/images/board/aidan.jpeg',
    linkedIn: 'https://www.linkedin.com/in/aidanaugustin/'
  },
  {
    name: 'Lindsey Day',
    img: '/assets/images/board/lindsey.jpeg',
    linkedIn: 'https://www.linkedin.com/in/magneticcareers/'
  },
  {
    name: 'Michelle Brownstein',
    img: '/assets/images/board/michelleb.jpeg',
    linkedIn: 'https://www.linkedin.com/in/michelle-brownstein/'
  },
  {
    name: 'Melissa White',
    img: '/assets/images/board/melissa.jpeg',
    linkedIn: 'https://www.linkedin.com/in/melissamaewhite/'
  },
  {
    name: 'Seyi Oluwaleimu',
    img: '/assets/images/board/seyi.jpeg',
    linkedIn: 'https://www.linkedin.com/in/oluwaseyi-oluwaleimu-307503142/'
  },
  {
    name: 'William Richardson',
    img: '/assets/images/board/will.jpeg',
    linkedIn: 'https://www.linkedin.com/in/williamrichardson1/'
  },
  {
    name: 'Aaron Dixon',
    img: '/assets/images/board/aarond.jpeg',
    linkedIn: 'https://www.linkedin.com/in/aaronbenjamindixon/'
  },
  {
    name: 'Christine Caven',
    img: '/assets/images/board/christinec.jpeg',
    linkedIn: 'https://www.linkedin.com/in/christinecaven/'
  },
  {
    name: 'Jasmine Banks',
    img: '/assets/images/board/jasmineb.jpeg',
    linkedIn: 'https://www.linkedin.com/in/jsbanks/'
  },
  {
    name: 'Clara Edwards',
    img: '/assets/images/board/clara.jpeg',
    linkedIn: 'https://www.linkedin.com/in/clara-edwards-77161435/'
  },
  {
    name: 'Elliot Welker',
    img: '/assets/images/board/elliot.png',
    linkedIn: 'https://www.linkedin.com/in/elliottwelker/'
  },
  {
    name: 'Keira Simmonds',
    img: '/assets/images/board/keiras.jpeg',
    linkedIn: 'https://www.linkedin.com/in/keirasimmonds/'
  },
  {
    name: 'Matthew Luedecke',
    img: '/assets/images/board/matthewl.jpeg',
    linkedIn: 'https://www.linkedin.com/in/matthew-luedecke/'
  },
  {
    name: 'Steve Shepard',
    img: '/assets/images/board/steve.jpeg',
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
          {
            sponsors.map(({name, url})=>(
            <CardContainer key={name}>
              <Card className="sponsor-card">
                <CardMedia
                  className="sponsor-img"
                  image={url}
                  title={name}
                />
              </Card>
            </CardContainer>
            ))
          }
        </Sponsors>
        <Programs>
          <h3>Programs</h3>
          {programs.map(program => (
            <Program key={program.title}>
              <h4>{program.title}</h4>
              <p>{program.description}</p>
            </Program>
          ))}
        </Programs>
        <Board>
          <h3>Board Members</h3>
          {boardMembers.map(member => (
            <BoardMember key={member.name}>
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
