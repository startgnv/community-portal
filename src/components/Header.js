import React from 'react';
import styled from 'styled-components/macro';
import { device } from './device';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';

const HeaderContainer = styled.div`
  height: ${({ theme }) => theme.headerHeight};
  display: flex;
  top: 0;
  left: 0;
  right: 0;

  .navigation {
    flex: 1;
    margin: 0;
    padding: 0;
    text-align: right;

    li {
      display: inline-block;
    }

    .nav-link {
      display: block;
      height: 30px;
      padding: 0 20px;
      color: white;
      text-decoration: none;
      line-height: 30px;
      color: ${({ theme }) => theme.textDark};
      font-size: 0.8rem;
      font-family: benton-sans-wide;
      font-weight: 500;
      text-transform: uppercase;

      &.active {
        color: ${({ theme }) => theme.green};
      }
    }

    @media ${device.tabletPort}, ${device.mobile} {
      display: none;
    }
  }
`;

const HeaderContent = styled.div`
  display: flex;
  width: 100%;
  height: ${({ theme }) => theme.headerHeight};
  align-items: center;
  align-content: space-between;
  max-width: 960px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
`;

const HamburgerContainer = styled.div`
  position: absolute;
  display: none;
  cursor: pointer;
  top: 27px;
  right: 30px;
  height: 26px;
  width: 40px;

  @media ${device.tabletPort}, ${device.mobile} {
    display: inline-block;
  }
`;

const Hamburger = styled.div`
  height: 2px;
  background-color: ${({ theme }) => theme.textDark};

  &:before,
  &:after {
    content: '';
    position: absolute;
    display: block;
    height: 2px;
    width: 40px;
    top: 12px;
    background-color: ${({ theme }) => theme.textDark};
  }

  &:after {
    top: 24px;
  }
`;

export const Header = ({ className }) => (
  <HeaderContainer className={className}>
    <HeaderContent>
      <Logo />
      <HamburgerContainer>
        <Hamburger />
      </HamburgerContainer>
      <ul className="navigation">
        <li>
          <NavLink className="nav-link" to="/" activeClassName="active" exact>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className="nav-link"
            to="/companies"
            activeClassName="active"
          >
            Companies
          </NavLink>
        </li>
        <li>
          <NavLink
            className="nav-link"
            to="/jobs"
            activeClassName="active"
            exact
          >
            Jobs
          </NavLink>
        </li>
        <li>
          <NavLink
            className="nav-link"
            to="/new-to-gainesville"
            activeClassName="active"
          >
            New To Gainesville
          </NavLink>
        </li>
      </ul>
    </HeaderContent>
  </HeaderContainer>
);

export default Header;
