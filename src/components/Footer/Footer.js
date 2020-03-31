import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { device } from '../device';
import { clearFix } from 'polished';
import Logo from '../UI/Logo';
import NewsletterForm from './NewletterForm';

const FooterContainer = styled.div`
  background: ${({ theme }) => theme.deepNavy};
  padding: 70px 0;
`;

const FooterRow = styled.div`
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

const FooterColumn = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
`;

const Info = styled.div`
  max-width: 275px;

  @media ${device.tabletPort}, ${device.mobile} {
    align-items: center;
    text-align: center;
  }
`;

const Description = styled.p`
  color: #a3a9b3;
  font-size: 13px;
  margin-top: 15px;
`;

const FooterNav = styled.div`
  margin-top: 50px;
`;

const FooterHeader = styled.h3`
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
  <FooterContainer>
    <FooterRow>
      <FooterColumn>
        <Info>
          <Logo variant="light" />
          <Description>
            startGNV is an initiative by startupGNV to promote and grow the
            Gainesville startup, tech, and biotech communities.
          </Description>
        </Info>
        <FooterNav>
          <FooterHeader>Explore startGNV</FooterHeader>
          <NavList>
            <li>
              <Link to="/companies" class="footer-link">
                Companies
              </Link>
            </li>
            <li>
              <Link to="/jobs" class="footer-link">
                Jobs
              </Link>
            </li>
            <li>
              <Link to="/new-to-gainesville" class="footer-link">
                New to Gainesville?
              </Link>
            </li>
            <li>
              <Link to="/about" class="footer-link">
                About
              </Link>
            </li>
          </NavList>
        </FooterNav>
        <Contact>
          <FooterHeader>Contact</FooterHeader>
          <NavList>
            <li>
              <a href="mailto:info@startupgnv.com" className="footer-link">
                info@startupgnv.com
              </a>
            </li>
          </NavList>
        </Contact>
      </FooterColumn>
      <FooterColumn>
        <NewsletterForm />
      </FooterColumn>
    </FooterRow>
  </FooterContainer>
);

export default Footer;
