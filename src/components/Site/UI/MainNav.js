import React, { useContext } from 'react';
import styled from 'styled-components';
import { device } from '../../utils/device';
import AppContext from '../../AppContext';
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
    text-decoration: none;
    line-height: 30px;
    color: ${({ variant, theme }) =>
      variant === 'light' ? 'white' : theme.textDark};
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

const MainNav = ({ variant }) => {
  const { closeSidebar } = useContext(AppContext);
  return (
    <NavContainer variant={variant}>
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
      <li>
        <NavLink
          className="nav-link"
          to="/sponsorship"
          activeClassName="active"
          onClick={closeSidebar}
        >
          Sponsorship
        </NavLink>
      </li>
      <li>
        <NavLink
          className="nav-link"
          to="/about"
          activeClassName="active"
          exact
          onClick={closeSidebar}
        >
          About
        </NavLink>
      </li>
    </NavContainer>
  );
};

export default MainNav;
