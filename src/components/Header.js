import React from 'react';
import styled from 'styled-components/macro';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.svg';

const HeaderContainer = styled.div`
  height: ${({ theme }) => theme.headerHeight};
  padding: 20px;
  text-align: center;
  background: black;
  box-sizing: border-box;

  .logo-link {
    display: block;
    margin-right: 30px;
    float: left;
  }

  .logo {
    display: block;
    height: 30px;
    border: 0;
  }

  .navigation {
    margin: 0;
    padding: 0;
    float: left;

    li {
      display: inline-block;
    }

    .nav-link {
      display: block;
      height: 30px;
      padding: 0 10px;
      color: white;
      text-decoration: none;
      line-height: 30px;

      &.active {
        color: ${({ theme }) => theme.green};
      }
    }
  }
`;

export const Header = ({ className }) => (
  <HeaderContainer className={className}>
    <a className="logo-link" href="http://startupgnv.com" target="_blank">
      <img className="logo" src={logo} alt="logo" />
    </a>
    <ul className="navigation">
      <li>
        <NavLink className="nav-link" to="/" activeClassName="active" exact>
          Jobs
        </NavLink>
      </li>
      <li>
        <NavLink className="nav-link" to="/companies" activeClassName="active">
          Companies
        </NavLink>
      </li>
      <li>
        <NavLink className="nav-link" to="/about" activeClassName="active">
          About
        </NavLink>
      </li>
    </ul>
  </HeaderContainer>
);

export default Header;
