import React from 'react';
import styled from 'styled-components/macro';
import Head from '../Header/Header';
import hero from '../../../assets/images/sponsorship-hero.jpg';
import fadeLine from '../../../assets/images/fade-line.svg';

// Icons
import theme from '../../utils/theme';
import send from '../../../assets/images/send.svg';
import dash from '../../../assets/images/dash.svg';
import tree from '../../../assets/images/tree.svg';
import plant from '../../../assets/images/plant.svg';
import seed from '../../../assets/images/seed.svg';

// Sponsorship tiers
import startupSprint from '../../../assets/images/startup-sprint.jpg';
import presentation from '../../../assets/images/presentation.jpg';
import ama from '../../../assets/images/ama.png';

// Masonry
import team from '../../../assets/images/masonry/team.jpg';
import award from '../../../assets/images/masonry/award.jpg';
import board from '../../../assets/images/masonry/board.jpg';
import group from '../../../assets/images/masonry/group.jpg';
import judge from '../../../assets/images/masonry/judge.jpg';
import notes from '../../../assets/images/masonry/notes.jpg';
import shine from '../../../assets/images/masonry/shine.jpg';
import smile from '../../../assets/images/masonry/smile.jpg';
import coffee from '../../../assets/images/masonry/coffee.jpg';
import winner from '../../../assets/images/masonry/winner.jpg';
import sprint from '../../../assets/images/masonry/startup-sprint.jpg';
import fun from '../../../assets/images/masonry/fun.jpg';
import food from '../../../assets/images/masonry/food.jpg';
import celebrate from '../../../assets/images/masonry/celebrate.jpg';
import smiles from '../../../assets/images/masonry/smiles.jpg';
import feather from '../../../assets/images/masonry/feathr.jpg';
import present from '../../../assets/images/masonry/present.jpg';
import talk from '../../../assets/images/masonry/talk.jpg';
import girls from '../../../assets/images/masonry/girls.jpg';
import { device } from '../../utils/device';

const HeroContainer = styled.section`
  min-height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(${hero}) no-repeat center center fixed;
  background-size: cover;
`;

const Hero = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 30px;

  @media ${device.tablet}, ${device.mobile} {
    padding: 15px;
    width: initial;
  }
`;

const Content = styled.div`
  width: 100%;
  max-width: ${theme.contentMaxWidth};
  margin: auto;
`;

const Title = styled.h1`
  color: white;
  max-width: 500px;
  line-height: 80px;
  margin-bottom: 40px;

  @media ${device.tablet}, ${device.mobile} {
    font-size: 42px;
    line-height: initial;
  }
`;

const Subtitle = styled.h2`
  color: white;
  font-size: 24px;
  line-height: 34px;
  max-width: 630px;
  box-sizing: border-box;

  @media ${device.tablet}, ${device.mobile} {
    font-size: 20px;
    line-height: 28px;
  }
`;

const SponsorsLabel = styled.h4`
  font-family: Montserrat, sans-serif;
  font-size: 13px;
  color: white;
  margin-right: 40px;
`;

const Sponsors = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin-top: 60px;
`;

const SponsorGrid = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
`;

const Sponsor = styled.img`
  filter: grayscale(100%);
  object-fit: cover;
  max-width: 150px;
  max-height: 50px;
`;

const WhoWeServe = styled.section`
  margin: 95px auto 60px auto;
  max-width: ${theme.contentMaxWidth};
`;

const Masonry = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  margin: auto;
  position: relative;
  width: 120%;
  left: -10%;
`;

const MasonryImg = styled.div`
  max-width: 200px;
  min-width: 100px;
  max-height: 150px;
  margin: 5px;

  border-radius: 10px;
  overflow: hidden;

  img {
    max-width: 100%;
  }
`;

const Header = styled.h2`
  font-family: Montserrat, sans-serif;
  font-weight: 300;
  font-size: 28px;
  text-align: center;
  color: ${theme.textDark};
  margin-bottom: 16px;

  @media ${device.tablet}, ${device.mobile} {
    font-size: 24px;
  }
`;

const SubHeader = styled.h3`
  font-family: Montserrat, sans-serif;
  font-weight: 300;
  font-size: 15px;
  text-align: center;
  color: ${theme.textDark};
  margin-bottom: 16px;

  @media ${device.tablet}, ${device.mobile} {
    display: none;
  }
`;

const Summary = styled.p`
  font-family: Montserrat, sans-serif;
  font-weight: 300;
  font-size: 13px;
  text-align: center;
  color: ${theme.textDark};
  opacity: 70%;
  margin: auto;
  margin-bottom: 16px;
  max-width: 580px;

  @media ${device.tablet}, ${device.mobile} {
    padding: 0 15px;
  }
`;

const SponsorOurMission = styled.section`
  margin-top: 80px;
`;

const HeadContainer = styled.div`
  max-width: 700px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin: auto;

  @media ${device.tablet}, ${device.mobile} {
    padding: 0 15px;
  }
`;

const Card = styled.div`
  padding: 35px;
  background: white;
  box-shadow: 3px 3px 13px rgba(0, 0, 0, 0.15);
  margin: auto;

  max-width: 460px;

  @media ${device.tablet}, ${device.mobile} {
    &.tier {
      width: 100%;
    }
  }
`;

const Button = styled.button`
  background: rgba(0, 180, 150, 0.08);
  border: none;
  border-radius: 5px;
  color: #00b496;
  font-family: Montserrat, sans-serif;
  font-weight: 300;
  padding: 12px 20px;
  margin-top: 25px;
`;

const Tier = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 60px 0;
  align-items: center;

  @media ${device.tablet}, ${device.mobile} {
    grid-template-columns: 1fr;
  }
`;

const TierImg = styled.div`
  width: 100%;
  padding: ${({ direction }) =>
    direction === 'left' ? '0 30px 0 0' : '0 0 0 30px'};

  img {
    width: 100%;
  }

  @media ${device.tablet}, ${device.mobile} {
    display: none;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  padding: 0 30px;

  @media ${device.tablet}, ${device.mobile} {
    padding: 0 15px;
  }
`;

const SponsorshipTitle = styled.h2`
  color: ${({ theme }) => theme.textDark};
  font-size: 48px;
  margin-bottom: 5px;

  @media ${device.tablet}, ${device.mobile} {
    font-size: 32px;
  }
`;

const SponsorshipSummary = styled.h4`
  color: ${({ theme }) => theme.textDark};
  opacity: 0.6;
  font-size: 18px;
  line-height: 26px;
  margin-bottom: 20px;
`;

const SponsorshipPrice = styled.h3`
  font-family: Montserrat, sans-serif;
  color: ${({ theme }) => theme.textDark};
  font-weight: 600;
  font-size: 48px;
  margin-bottom: 20px;

  span {
    font-size: 24px;
    font-weight: 400;
  }

  @media ${device.tablet}, ${device.mobile} {
    font-size: 42px;

    span {
      font-size: 18px;
    }
  }
`;

const SponsorshipPerks = styled.ul`
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;

  @media ${device.tablet}, ${device.mobile} {
    grid-template-columns: 1fr;
  }
`;

const PerkColumn = styled.div``;

const SponsorshipPerk = styled.li`
  margin-bottom: 15px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  font-family: Montserrat, sans-serif;
  color: ${({ theme }) => theme.textDark};
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;

  img {
    align-self: start;
    margin: 7px 15px 0 0;
  }
`;

const SponsorshipSubperk = styled.li`
  margin-bottom: 15px;
  padding-left: 25px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  font-family: Montserrat, sans-serif;
  color: ${({ theme }) => theme.textDark};
  font-weight: 400;
  font-size: 14px;

  img {
    align-self: start;
    margin: 7px 15px 0 0;
  }
`;

const Divider = styled.div`
  height: 1px;
  width: 115%;
  margin: 25px -35px;
  background-color: ${({ theme }) => theme.textDark};
  opacity: 0.1;
`;

const SponsorButton = styled.a`
  width: 100%;
  background: white;
  border: 1px solid #f35b1a;
  border-radius: 3px;
  padding: 12px;

  font-family: Montserrat, sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #f35b1a;
  text-decoration: none;

  display: flex;
  justify-content: center;
  box-sizing: border-box;
`;

const TableContainer = styled.div`
  @media ${device.tablet}, ${device.mobile} {
    overflow-x: scroll;
  }
`;

const Table = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  max-width: ${theme.contentMaxWidth};
  margin: auto;
  margin-bottom: 100px;
  padding: 0 20px;

  width: 800px;
`;

const TableColumn = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: 1.5fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
`;

const TableData = styled.p`
  font-family: Montserrat, sans-serif;
  font-size: ${props => (props.small ? '14px' : '20px')};
  font-weight: 400;
  color: ${({ theme }) => theme.textDark};
  text-align: center;

  padding: ${props => (props.small ? '0 45px' : '20px 0')};
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${props => (props.striped ? '#FCFCFC' : '#FFF')};
  border-top: ${props =>
    props.striped ? '1px solid rgba(19, 21, 22, 0.1)}' : '#FFF'};
  border-bottom: ${props =>
    props.striped ? '1px solid rgba(19, 21, 22, 0.1)}' : '#FFF'};
`;

const TableHeadLabel = styled.h3`
  font-family: Montserrat, sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.textDark};

  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  img {
    margin-bottom: 12px;
  }
`;

const TableLabel = styled.p`
  font-family: Montserrat, sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.textDark};
  display: flex;
  align-items: center;
  background-color: ${props => (props.striped ? '#FCFCFC' : '#FFF')};
  border-top: ${props =>
    props.striped ? '1px solid rgba(19, 21, 22, 0.1)}' : '#FFF'};
  border-bottom: ${props =>
    props.striped ? '1px solid rgba(19, 21, 22, 0.1)}' : '#FFF'};
`;

const Line = styled.img`
  position: absolute;
  width: 100%;
`;

const SponsorshipPage = () => {
  const linkRef = React.useRef(null);
  const scroll = () => window.scrollTo(0, linkRef.current.offsetTop);

  return (
    <main style={{ overflow: 'hidden' }}>
      <Line style={{ top: '755px' }} src={fadeLine} />
      <HeroContainer>
        <Head transparent />
        <Hero>
          <Content>
            <Title>Sponsorship & Involvement</Title>
            <Subtitle>
              We are a dynamic team led by a "working board" of active
              volunteers including founders of high-growth startups, leaders of
              established tech companies, professors from the University of
              Florida, and other passionate citizens.
            </Subtitle>
          </Content>
        </Hero>
      </HeroContainer>

      <WhoWeServe>
        <Header>Who We Serve</Header>
        <SubHeader>
          <pre>
            High-Growth Startups | Tech Companies | Employees | Innovators
          </pre>
        </SubHeader>
        <Summary>
          startGNV is a 501(c)(3) non-profit dedicated to growing the innovation
          ecosystem of Greater Gainesville. We support local high-growth
          startups, tech companies, their employees and innovators through our
          programs,communication platforms and our community portal.
        </Summary>
      </WhoWeServe>

      <div style={{ overflow: 'hidden' }}>
        <Masonry style={{ alignItems: 'flex-end' }}>
          <MasonryImg>
            <img src={coffee} alt="Team" />
          </MasonryImg>
          <MasonryImg>
            <img src={winner} alt="Team" />
          </MasonryImg>
          <MasonryImg>
            <img src={sprint} alt="Team" />
          </MasonryImg>
          <MasonryImg>
            <img src={fun} alt="Team" />
          </MasonryImg>
          <MasonryImg>
            <img src={food} alt="Team" />
          </MasonryImg>
          <MasonryImg>
            <img src={celebrate} alt="Team" />
          </MasonryImg>
          <MasonryImg>
            <img src={smiles} alt="Team" />
          </MasonryImg>
          <MasonryImg>
            <img src={feather} alt="Team" />
          </MasonryImg>
          <MasonryImg>
            <img src={present} alt="Team" />
          </MasonryImg>
        </Masonry>

        <Masonry style={{ alignItems: 'flex-start' }}>
          <MasonryImg>
            <img src={team} alt="Team" />
          </MasonryImg>
          <MasonryImg>
            <img src={award} alt="Team" />
          </MasonryImg>
          <MasonryImg>
            <img src={board} alt="Team" />
          </MasonryImg>
          <MasonryImg>
            <img src={group} alt="Team" />
          </MasonryImg>
          <MasonryImg>
            <img src={judge} alt="Team" />
          </MasonryImg>
          <MasonryImg>
            <img src={notes} alt="Team" />
          </MasonryImg>
          <MasonryImg>
            <img src={shine} alt="Team" />
          </MasonryImg>
          <MasonryImg>
            <img src={talk} alt="Team" />
          </MasonryImg>
          <MasonryImg>
            <img src={girls} alt="Team" />
          </MasonryImg>
        </Masonry>
      </div>

      <SponsorOurMission>
        <HeadContainer>
          <Card style={{ maxWidth: 'none' }}>
            <Header>Help Sponsor Our Mission</Header>
            <SubHeader>
              <pre>
                Community Exposure | Community Connections | Gainesville Growth
              </pre>
            </SubHeader>
            <Summary>
              Grow Gainesville’s innovation ecosystem and Gainesville itself by
              supporting our events and platforms that bring together community
              partners, organizations and vibrant individuals. You’ll help
              future co-founders meet, connect with future talent and strengthen
              bonds in the community.
            </Summary>
          </Card>
          <Button onClick={scroll}>See Sponsorship Package Comparison</Button>
        </HeadContainer>
      </SponsorOurMission>

      <Tier>
        <CardContainer>
          <Card class="tier">
            <SponsorshipTitle>Community Champion</SponsorshipTitle>
            <SponsorshipSummary>
              You're invested in Greater Gainesville's growth, and we're here to
              make sure everyone knows it. As one of our premium sponsors, we'll
              offer you an on-brand, authentic, and exciting opportunity to
              engage with the innovation ecosystem and to build brand trust
              within our community.
            </SponsorshipSummary>
            <SponsorshipPrice>
              $11,000<span>/yr</span>
            </SponsorshipPrice>
            <SponsorshipPerks>
              <PerkColumn>
                <SponsorshipPerk>
                  <img src={send} alt=">" />
                  Concierge creative service and copywriting from startGNVs
                  brand stewards
                </SponsorshipPerk>
                <SponsorshipPerk>
                  <img src={send} alt=">" />
                  Host an exclusive AMA -- or -- serve as a keynote speaker at a
                  large event
                </SponsorshipPerk>
                <SponsorshipPerk>
                  <img src={send} alt=">" />
                  TWO (2) blog spotlights about your company
                </SponsorshipPerk>
                <SponsorshipPerk>
                  <img src={send} alt=">" />
                  Booth, table, or creative presence at larger events
                </SponsorshipPerk>
                <SponsorshipPerk>
                  <img src={send} alt=">" />
                  Swag giveaway social promotion
                </SponsorshipPerk>
                <SponsorshipPerk>
                  <img src={send} alt=">" />
                  ONE (1) specialized social media campaign
                </SponsorshipPerk>
                <SponsorshipPerk>
                  <img src={send} alt=">" />
                  ONE (1) VIP table at CelebrateGNV
                </SponsorshipPerk>
              </PerkColumn>
              <PerkColumn>
                <SponsorshipPerk>
                  <img src={send} alt=">" />
                  Premiere Brand Recognition
                </SponsorshipPerk>
                <SponsorshipSubperk>
                  <img src={dash} alt="-" />
                  Multichannel promotion across the startGNV newsletter and
                  social media
                </SponsorshipSubperk>
                <SponsorshipSubperk>
                  <img src={dash} alt="-" />
                  Top-level exposure at all startGNV programs
                </SponsorshipSubperk>
                <SponsorshipSubperk>
                  <img src={dash} alt="-" />
                  Top-level exposure at CelebrateGNV
                </SponsorshipSubperk>
                <SponsorshipSubperk>
                  <img src={dash} alt="-" />
                  Top-level logo exposure on startGNV website, newsletter, and
                  annual report
                </SponsorshipSubperk>
                <SponsorshipSubperk>
                  <img src={dash} alt="-" />
                  Large logo on startGNV event promotional materials
                </SponsorshipSubperk>
                <SponsorshipSubperk>
                  <img src={dash} alt="-" />A quote or company recognition in
                  one startGNV press pitch
                </SponsorshipSubperk>
              </PerkColumn>
            </SponsorshipPerks>
            <Divider />
            <SponsorButton
              href="mailto:lauren.asmus@startgnv.com?subject=Community%20Champion%20Sponsorship"
              target="_blank"
              rel="noopener noreferrer"
            >
              Become a Champion
            </SponsorButton>
          </Card>
        </CardContainer>
        <TierImg direction="right">
          <img src={startupSprint} alt="CelebrateGNV" />
        </TierImg>
      </Tier>

      <Tier>
        <TierImg direction="left">
          <img src={presentation} alt="CelebrateGNV" />
        </TierImg>
        <CardContainer>
          <Card class="tier">
            <SponsorshipTitle>Annual Partner</SponsorshipTitle>
            <SponsorshipSummary>
              Together, we can help the innovation ecosystem of Greater
              Gainesville grow in leaps and bounds! Let us position and promote
              you as a key partner in all startGNV efforts.
            </SponsorshipSummary>
            <SponsorshipPrice>
              $6,500<span>/yr</span>
            </SponsorshipPrice>
            <SponsorshipPerks>
              <PerkColumn>
                <SponsorshipPerk>
                  <img src={send} alt=">" />
                  Serve as an AMA panelist -- or -- give a speech about your
                  company at a small event
                </SponsorshipPerk>
                <SponsorshipPerk>
                  <img src={send} alt=">" />
                  ONE (1) blog spotlight about your company
                </SponsorshipPerk>
                <SponsorshipPerk>
                  <img src={send} alt=">" />
                  Swag giveaway social promotion
                </SponsorshipPerk>
                <SponsorshipPerk>
                  <img src={send} alt=">" />
                  FOUR (4) creative social media features about your company
                </SponsorshipPerk>
                <SponsorshipPerk>
                  <img src={send} alt=">" />
                  FOUR (4) tickets to CelebrateGNV
                </SponsorshipPerk>
              </PerkColumn>
              <PerkColumn>
                <SponsorshipPerk>
                  <img src={send} alt=">" />
                  Premium Brand Recognition
                </SponsorshipPerk>
                <SponsorshipSubperk>
                  <img src={dash} alt="-" />
                  Multichannel promotion across the startGNV newsletter and
                  social media
                </SponsorshipSubperk>
                <SponsorshipSubperk>
                  <img src={dash} alt="-" />
                  Featured at all startGNV programs
                </SponsorshipSubperk>
                <SponsorshipSubperk>
                  <img src={dash} alt="-" />
                  Featured at CelebrateGNV
                </SponsorshipSubperk>
                <SponsorshipSubperk>
                  <img src={dash} alt="-" />
                  Logo exposure on startGNV website, newsletter, and annual
                  report
                </SponsorshipSubperk>
                <SponsorshipSubperk>
                  <img src={dash} alt="-" />
                  Medium logo on startGNV event promotional materials
                </SponsorshipSubperk>
              </PerkColumn>
            </SponsorshipPerks>
            <Divider />
            <SponsorButton
              href="mailto:lauren.asmus@startgnv.com?subject=Annual%20Partner%20Sponsorship"
              target="_blank"
              rel="noopener noreferrer"
            >
              Become a Partner
            </SponsorButton>
          </Card>
        </CardContainer>
      </Tier>

      <Tier>
        <CardContainer>
          <Card class="tier">
            <SponsorshipTitle>Annual Supporter</SponsorshipTitle>
            <SponsorshipSummary>
              Whether you're in the lean and mean growth phase or just testing
              the sponsorship waters, we value your investment in startGNV and
              our community. Our team is here to go the extra mile to show
              gratitude and love to companies like you!
            </SponsorshipSummary>
            <SponsorshipPrice>
              $2,250<span>/yr</span>
            </SponsorshipPrice>
            <SponsorshipPerks>
              <PerkColumn>
                <SponsorshipPerk>
                  <img src={send} alt=">" />
                  One creative social media feature about your company
                </SponsorshipPerk>
                <SponsorshipPerk>
                  <img src={send} alt=">" />
                  Swag giveaway social promotion
                </SponsorshipPerk>
                <SponsorshipPerk>
                  <img src={send} alt=">" />
                  TWO (2) tickets to CelebrateGNV
                </SponsorshipPerk>
              </PerkColumn>
              <PerkColumn>
                <SponsorshipPerk>
                  <img src={send} alt=">" />
                  Brand Recognition
                </SponsorshipPerk>
                <SponsorshipSubperk>
                  <img src={dash} alt="-" />
                  Multichannel promotion across the startGNV newsletter and
                  social media
                </SponsorshipSubperk>
                <SponsorshipSubperk>
                  <img src={dash} alt="-" />
                  Featured at all startGNV programs
                </SponsorshipSubperk>
                <SponsorshipSubperk>
                  <img src={dash} alt="-" />
                  Small feature at CelebrateGNV
                </SponsorshipSubperk>
                <SponsorshipSubperk>
                  <img src={dash} alt="-" />
                  Name listed on startGNV website, newsletter, and annual report
                </SponsorshipSubperk>
                <SponsorshipSubperk>
                  <img src={dash} alt="-" />
                  Small logo on startGNV event promotional materials
                </SponsorshipSubperk>
              </PerkColumn>
            </SponsorshipPerks>
            <Divider />
            <SponsorButton
              href="mailto:lauren.asmus@startgnv.com?subject=Annual%20Supporter%20Sponsorship"
              target="_blank"
              rel="noopener noreferrer"
            >
              Become a Supporter
            </SponsorButton>
          </Card>
        </CardContainer>
        <TierImg direction="right">
          <img src={ama} alt="CelebrateGNV" />
        </TierImg>
      </Tier>

      <TableContainer style={{ display: 'none' }}>
        <Table>
          <TableColumn>
            <TableLabel />
            <TableLabel>Major Programs as a Featured Sponsor</TableLabel>
            <TableLabel striped>
              Minor Programs as a Featured Sponsor
            </TableLabel>
            <TableLabel>Exposure Level at CelebrateGNV</TableLabel>
            <TableLabel striped>Included VIP Tables at CelebrateGNV</TableLabel>
            <TableLabel>Included Blog Post Spotlights</TableLabel>
            <TableLabel striped>
              Exposure Type on Website and Newsletter
            </TableLabel>
            <TableLabel>Annual Commitment</TableLabel>
          </TableColumn>

          <TableColumn>
            <TableHeadLabel>
              <img src={tree} alt="Tree" />
              Community Champion
            </TableHeadLabel>
            <TableData>4</TableData>
            <TableData striped>4</TableData>
            <TableData>Top-Level</TableData>
            <TableData striped>2</TableData>
            <TableData>2</TableData>
            <TableData striped>Large Logo</TableData>
            <TableData>$10,000</TableData>
          </TableColumn>

          <TableColumn>
            <TableHeadLabel>
              <img src={plant} alt="Plant" />
              Annual Partner
            </TableHeadLabel>
            <TableData>2</TableData>
            <TableData striped>2</TableData>
            <TableData>Featured</TableData>
            <TableData striped>1</TableData>
            <TableData>1</TableData>
            <TableData striped>Medium Logo</TableData>
            <TableData>$6,000</TableData>
          </TableColumn>

          <TableColumn>
            <TableHeadLabel>
              <img src={seed} alt="Seed" />
              Annual Supporter
            </TableHeadLabel>
            <TableData>1</TableData>
            <TableData striped>1</TableData>
            <TableData>Thanks</TableData>
            <TableData striped>2 Tickets</TableData>
            <TableData>X</TableData>
            <TableData striped small>
              Company Name in Text
            </TableData>
            <TableData>$3,500</TableData>
          </TableColumn>
        </Table>
      </TableContainer>
    </main>
  );
};

export default SponsorshipPage;
