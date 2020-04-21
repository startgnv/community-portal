import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { device } from '../../utils/device';
import { clearFix } from 'polished';
import Logo from '../UI/Logo';
import NewsletterForm from './NewletterForm';

const Container = styled.div`
  background: ${({ theme }) => theme.deepNavy};
  padding: 70px 0;
`;

const Row = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin: 0 auto;
  padding: 0 50px;
  max-width: ${({ theme }) => theme.contentMaxWidth};
  
  ${clearFix()}
  
  @media ${device.tabletPort}, ${device.mobile} {
    flex-flow: column nowrap;
    align-items: center;
    padding: 0;
  }
`;

const Column = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
`;

const Info = styled.div`
  max-width: 250px;

  @media ${device.tabletPort}, ${device.mobile} {
    align-items: center;
    text-align: center;
  }
`;

const LogoContainer = styled.div`
  @media ${device.tabletPort}, ${device.mobile} {
    display: flex;
    justify-content: center;
  }
`;

const Description = styled.p`
  color: #a3a9b3;
  font-size: 13px;
  margin-top: 15px;
`;

const Nav = styled.div`
  margin-top: 50px;
`;

const Header = styled.h3`
  margin-bottom: 5px;
  color: #a3a9b3;
  font-size: 13px;
  text-transform: uppercase;
  font-family: 'Montserrat', sans-serif;
`;

const NavList = styled.ul`
  ${clearFix()}

  li {
    width: 50%;
    float: left;
  }

  .footer-link {
    color: #a3a9b3;
    text-decoration: none;
    font-size: 13px;
    line-height: 30px;
    transition: 250ms;

    &:hover {
      color: white;
    }
  }
`;

const Contact = styled.div`
  margin-top: 50px;
`;

const Footer = () => (
  <Container>
    <Row>
      <Column>
        <Info>
          <LogoContainer>
            <Logo variant="light" />
          </LogoContainer>
          <Description>
            startGNV is a 501(c)(3) non-profit dedicated to growing the
            innovation ecosystem of Greater Gainesville.
          </Description>
          <Description>
            This website was only possible thanks to contributions from The
            University of Florida, The Greater Gainesville Chamber of Commerce
            and The City of Gainesville.
          </Description>
        </Info>
        <Nav>
          <Header>Explore startGNV</Header>
          <NavList>
            <li>
              <Link to="/companies" className="footer-link">
                Companies
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="footer-link">
                Jobs
              </Link>
            </li>
            <li>
              <Link to="/ecosystem" className="footer-link">
                Ecosystem
              </Link>
            </li>
            <li>
              <Link to="/about" className="footer-link">
                About
              </Link>
            </li>
            <li>
              <a
                className="footer-link"
                href="https://www.iubenda.com/privacy-policy/40668682"
                target="_blank"
              >
                Privacy Policy
              </a>
            </li>
          </NavList>
        </Nav>
        <Contact>
          <Header>Contact</Header>
          <NavList>
            <li>
              <a href="mailto:info@startupgnv.com" className="footer-link">
                info@startupgnv.com
              </a>
            </li>
          </NavList>
        </Contact>
      </Column>
      <Column>
        <NewsletterForm />
      </Column>
    </Row>
  </Container>
);

export default Footer;
