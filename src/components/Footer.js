import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { clearFix } from 'polished';
import Logo from './Logo';

const FooterContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.deepNavy};

  &:before {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 70%;
    content: '';
    background: #1d2d3b;
    z-index: 1;
  }
`;

const FooterContent = styled.div`
  display: flex;
  max-width: ${({ theme }) => theme.contentMaxWidth};
  margin: 0 auto;
  ${clearFix()}
`;

const EmailSubscribe = styled.div`
  position: relative;
  flex: 2;
  padding: 30px 60px 30px 30px;
  float: left;
  background: #1d2d3b;
  z-index: 10;
`;

const SubscribeTagline = styled.p`
  color: #a3a9b3;
  font-size: 13px;
`;

const FooterNavContainer = styled.div`
  flex: 2;
  padding: 30px 30px 30px 80px;
`;

const FooterNav = styled.div`
  ${clearFix()}
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
  flex: 1;
  padding: 30px;

  h3 {
  }
`;

const Footer = () => (
  <FooterContainer>
    <FooterContent>
      <EmailSubscribe>
        <Logo />
        <SubscribeTagline>
          sparkGNV is an initiative by startupGNV to promote and grow the
          Gainesville startup, tech, and biotech communities.
        </SubscribeTagline>
      </EmailSubscribe>
      <FooterNavContainer>
        <FooterNav>
          <FooterHeader>Explore sparkGNV</FooterHeader>
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
              <Link to="/why-gainesville" class="footer-link">
                Why Gainesville?
              </Link>
            </li>
            <li>
              <Link to="/faq" class="footer-link">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/about" class="footer-link">
                About
              </Link>
            </li>
            <li>
              <Link to="/sponsors" class="footer-link">
                Sponsors
              </Link>
            </li>
          </NavList>
        </FooterNav>
      </FooterNavContainer>
      <Contact>
        <FooterHeader>Contact</FooterHeader>
        <NavList>
          <li>
            <a href="mailto:info@startupgnv.com" class="footer-link">
              info@startupgnv.com
            </a>
          </li>
        </NavList>
      </Contact>
    </FooterContent>
  </FooterContainer>
);

export default Footer;
