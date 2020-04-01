import React, { useContext } from 'react';
import styled from 'styled-components';
import { device } from './device';
import AppContext from './AppContext';
import { NavLink } from 'react-router-dom';

const NavContainer = styled.ul`
  text-align: right;
  margin: 0;
  padding: 0;
  justify-content: right;

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
    text-align: left;

    li {
      display: block;
    }

    .nav-link {
      height: 60px;
      line-height: 60px;
    }
  }
`;

const MainNav = () => {
  const { closeSidebar } = useContext(AppContext);
  return (
    <NavContainer>
      <li>
        <NavLink
          className="nav-link"
          to="/"
          activeClassName="active"
          exact
          onClick={closeSidebar}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className="nav-link"
          to="/companies"
          activeClassName="active"
          onClick={closeSidebar}
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
          onClick={closeSidebar}
        >
          Jobs
        </NavLink>
      </li>
      <li>
        <NavLink
          className="nav-link"
          to="/ecosystem"
          activeClassName="active"
          onClick={closeSidebar}
        >
          Ecosystem
        </NavLink>
      </li>
    </NavContainer>
  );
};

export default MainNav;
