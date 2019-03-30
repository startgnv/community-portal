import React from 'react';
import styled from 'styled-components/macro';
import logo from '../assets/images/logo.svg';

const HeaderContainer = styled.div`
  height: 70px;
  padding: 20px;
  text-align: center;
  background: black;
  box-sizing: border-box;

  .logo-link {
    display: inline-block;
  }

  .logo {
    display: block;
    height: 30px;
    border: 0;
  }
`;

export const Header = ({ className }) => (
  <HeaderContainer className={className}>
    <a className="logo-link" href="http://startupgnv.com" target="_blank">
      <img className="logo" src={logo} alt="logo" />
    </a>
  </HeaderContainer>
);

export default Header;
