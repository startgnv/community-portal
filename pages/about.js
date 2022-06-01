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
  {
    name: 'Cox Business',
    url:
      'https://firebasestorage.googleapis.com/v0/b/startupgnv-39bca.appspot.com/o/sponsorLogos%2Fcox.jpg?alt=media'
  },
  {
    name: 'Hutchison, PLLC',
    url:
      'https://firebasestorage.googleapis.com/v0/b/startupgnv-39bca.appspot.com/o/sponsorLogos%2FHutchisonPLLC.png?alt=media'
  },
  {
    name: 'Three Five Two, Inc',
    url:
      'https://firebasestorage.googleapis.com/v0/b/startupgnv-39bca.appspot.com/o/sponsorLogos%2FThreeFiveTwo.png?alt=media'
  },
  {
    name: 'OPIE Software',
    url:
      'https://firebasestorage.googleapis.com/v0/b/startupgnv-39bca.appspot.com/o/sponsorLogos%2Fopiesoftware.jpg?alt=media'
  },
  {
    name: 'Feathr',
    url:
      'https://firebasestorage.googleapis.com/v0/b/startupgnv-39bca.appspot.com/o/sponsorLogos%2Ffeathr.png?alt=media'
  },
  {
    name: 'InfoTech',
    url:
      'https://firebasestorage.googleapis.com/v0/b/startupgnv-39bca.appspot.com/o/sponsorLogos%2Finfotech.png?alt=media'
  },
  {
    name: 'Interactive Resources',
    url:
      'https://firebasestorage.googleapis.com/v0/b/startupgnv-39bca.appspot.com/o/sponsorLogos%2Fsante-fe.png?alt=media'
  },
  {
    name: 'Trimark Properties',
    url:
      'https://firebasestorage.googleapis.com/v0/b/startupgnv-39bca.appspot.com/o/sponsorLogos%2Ftrimark.png?alt=media'
  },
  {
    name: 'Betterme Productions',
    url:
      'https://firebasestorage.googleapis.com/v0/b/startupgnv-39bca.appspot.com/o/sponsorLogos%2Fbetterme.png?alt=media'
  },
  {
    name: 'PS27 Ventures',
    url:
      'https://firebasestorage.googleapis.com/v0/b/startupgnv-39bca.appspot.com/o/sponsorLogos%2Fps27.png?alt=media'
  },
  {
    name: 'AlertTrace',
    url:
      'https://firebasestorage.googleapis.com/v0/b/startupgnv-39bca.appspot.com/o/sponsorLogos%2FAlertTrace.jpg?alt=media'
  },
  {
    name: 'fcu',
    url:
      'https://firebasestorage.googleapis.com/v0/b/startupgnv-39bca.appspot.com/o/sponsorLogos%2Ffcu.jpg?alt=media'
  },
  {
    name: 'Sharpspring',
    url:
      'https://firebasestorage.googleapis.com/v0/b/startupgnv-39bca.appspot.com/o/sponsorLogos%2Fsharpspring.png?alt=media'
  },
  {
    name: 'UF Real Estate',
    url:
      'https://firebasestorage.googleapis.com/v0/b/startupgnv-39bca.appspot.com/o/sponsorLogos%2Fufrealestate.png?alt=media'
  },
  {
    name: 'San Felasco Tech City',
    url:
      'https://firebasestorage.googleapis.com/v0/b/startupgnv-39bca.appspot.com/o/sponsorLogos%2FSan-Felasco-Tech-City-Logo.jpg?alt=media'
  },
  {
    name: 'Admiral',
    url:
      'https://firebasestorage.googleapis.com/v0/b/startupgnv-39bca.appspot.com/o/sponsorLogos%2FAdmiral.png?alt=media'
  },
  {
    name: 'James Moore',
    url:
      'https://firebasestorage.googleapis.com/v0/b/startupgnv-39bca.appspot.com/o/sponsorLogos%2FJamesMoore.jpg?alt=media'
  },
  {
    name: 'Guide to Greater Gainesville',
    url:
      'https://firebasestorage.googleapis.com/v0/b/startupgnv-39bca.appspot.com/o/sponsorLogos%2Fguidetogreatergainesville.png?alt=media'
  }
];

const boardMembers = [
  {
    name: 'James Gibson',
    img:
      'https://firebasestorage.googleapis.com/v0/b/startupgnv-39bca.appspot.com/o/boardMembers%2Fjames.png?alt=media',
    linkedIn: 'https://www.linkedin.com/in/james-c-gibson/'
  },
  {
    name: 'Michelle Brownstein',
    img:
      'https://firebasestorage.googleapis.com/v0/b/startupgnv-39bca.appspot.com/o/boardMembers%2Fmichelleb.jpeg?alt=media',
    linkedIn: 'https://www.linkedin.com/in/michelle-brownstein/'
  },
  {
    name: 'Melissa White',
    img:
      'https://firebasestorage.googleapis.com/v0/b/startupgnv-39bca.appspot.com/o/boardMembers%2Fmelissa.jpeg?alt=media',
    linkedIn: 'https://www.linkedin.com/in/melissamaewhite/'
  },
  {
    name: 'Seyi Oluwaleimu',
    img:
      'https://firebasestorage.googleapis.com/v0/b/startupgnv-39bca.appspot.com/o/boardMembers%2Fseyi.jpeg?alt=media',
    linkedIn: 'https://www.linkedin.com/in/oluwaseyi-oluwaleimu-307503142/'
  },
  {
    name: 'Aaron Dixon',
    img:
      'https://firebasestorage.googleapis.com/v0/b/startupgnv-39bca.appspot.com/o/boardMembers%2Faarond.jpeg?alt=media',
    linkedIn: 'https://www.linkedin.com/in/aaronbenjamindixon/'
  },
  {
    name: 'Christine Caven',
    img:
      'https://firebasestorage.googleapis.com/v0/b/startupgnv-39bca.appspot.com/o/boardMembers%2Fchristinec.jpeg?alt=media',
    linkedIn: 'https://www.linkedin.com/in/christinecaven/'
  },
  {
    name: 'Elliot Welker',
    img:
      'https://firebasestorage.googleapis.com/v0/b/startupgnv-39bca.appspot.com/o/boardMembers%2Felliot.png?alt=media',
    linkedIn: 'https://www.linkedin.com/in/elliottwelker/'
  },
  {
    name: 'Joanna Barousse',
    img:
      'https://firebasestorage.googleapis.com/v0/b/startupgnv-39bca.appspot.com/o/boardMembers%2Fjoanna.jpg?alt=media',
    linkedIn: 'https://www.linkedin.com/in/joanna-barousse/'
  },
  {
    name: 'Joe Manglardi',
    img:
      'https://firebasestorage.googleapis.com/v0/b/startupgnv-39bca.appspot.com/o/boardMembers%2Fjoe.jpg?alt=media',
    linkedIn: 'https://www.linkedin.com/in/joe-manglardi/'
  },
  {
    name: 'Jon Church',
    img:
      'https://firebasestorage.googleapis.com/v0/b/startupgnv-39bca.appspot.com/o/boardMembers%2Fjon.jpg?alt=media',
    linkedIn: 'https://www.linkedin.com/in/jon-church-85490025/'
  },
  {
    name: 'Julia Thomas',
    img:
      'https://firebasestorage.googleapis.com/v0/b/startupgnv-39bca.appspot.com/o/boardMembers%2Fjulia.jpg?alt=media',
    linkedIn: 'https://www.linkedin.com/in/juliathomasmktg/'
  },
  {
    name: 'Sarah Ryals',
    img:
      'https://firebasestorage.googleapis.com/v0/b/startupgnv-39bca.appspot.com/o/boardMembers%2Fsarah.jpg?alt=media',
    linkedIn: 'https://www.linkedin.com/in/sarah-ryals/'
  },
  {
    name: 'Stacy Burrell',
    img:
      'https://firebasestorage.googleapis.com/v0/b/startupgnv-39bca.appspot.com/o/boardMembers%2Fstacy.jpg?alt=media',
    linkedIn: 'https://www.linkedin.com/in/stacyburrell/'
  },
  {
    name: 'Scott Schroeder',
    img:
      'https://firebasestorage.googleapis.com/v0/b/startupgnv-39bca.appspot.com/o/boardMembers%2Fscott.jpg?alt=media',
    linkedIn: 'https://www.linkedin.com/in/schroederscott/'
  },
  {
    name: 'Neil Israel',
    img:
      'https://firebasestorage.googleapis.com/v0/b/startupgnv-39bca.appspot.com/o/boardMembers%2Fneil.jpeg?alt=media',
    linkedIn: 'https://www.linkedin.com/in/neilisrael/'
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
          {sponsors.map(({ name, url }) => (
            <CardContainer key={name}>
              <Card className="sponsor-card">
                <CardMedia className="sponsor-img" image={url} title={name} />
              </Card>
            </CardContainer>
          ))}
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
