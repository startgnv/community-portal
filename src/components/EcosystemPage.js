import React from 'react';
import styled from 'styled-components/macro';
import Hero from './Hero';
import PageContent from './PageContent';

const EcosystemPageContainer = styled.div``;

const HeroHeadline = styled.h2`
  font-size: 46px;
  color: white;

  strong {
    color: ${({ theme }) => theme.teal};
    font-weight: 700;
  }
`;

const EcosystemPage = () => (
  <EcosystemPageContainer>
    <Hero>
      <HeroHeadline>Ecosystem</HeroHeadline>
    </Hero>
    <PageContent>
      <p>
        Narrative about Gatorade? Grooveshark? History of major exits by
        companies?
      </p>
      <h2>New to the Gainesville tech/startup community?</h2>
      <ul>
        <li>Join the GNV Connect Slack: https://gnvconnect.com/</li>
        <li>
          Sign up for the startupGNV newsletter:
          https://startupgnv.com/get-connected/
        </li>
      </ul>
      <h2>Calendars of Tech/Startup Events:</h2>
      <ul>
        <li>UF INNOVATE https://innovate.research.ufl.edu/event-calendar/</li>
        <li>
          Greater Gainesville Chamber
          https://members.gainesvillechamber.com/events/calendar/
        </li>
      </ul>
      <h2>Top Monthly Meetups</h2>
      <ul>
        <li>Buzz by SharpSpring https://careers.sharpspring.com/buzz/</li>
        <li>
          Frontend Awesome!
          https://www.meetup.com/Gainesville-Front-End-Dev-Meetup/
        </li>
        <li>Gainesville UX https://www.meetup.com/Gainesville-UX-Design/</li>
        <li>
          PMI - Gainesville Chapter
          https://www.meetup.com/Gainesville-Project-Management-Meetup/events/gkhdwqyzmbpb/
        </li>
        <li>AIGA - Gainesville Chapter https://gainesville.aiga.org/</li>
      </ul>
      <h2>Signature Events</h2>
      <ul>
        <li>Celebrate GNV</li>
        <li>Josh Greenberg Day</li>
        <li>Barcamp</li>
        <li>Tech Fundraiser Concert</li>
        <li>ALL IN GNV</li>
        <li>Startup Weekend</li>
        <li>Super Meetup</li>
        <li>Cade Prize: https://www.cademuseum.org/cadeprize.html</li>
      </ul>
    </PageContent>
  </EcosystemPageContainer>
);

export default EcosystemPage;
