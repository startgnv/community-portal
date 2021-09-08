import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import { device } from '../../utils/device';
import AppContext from '../../AppContext';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';

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
  const router = useRouter();
  const isActive = path => {
    return path === router.pathname ? 'active' : '';
  };
  return (
    <NavContainer variant={variant}>
      <li>
        <Link href="/companies">
          <a
            className={`nav-link ${isActive('/companies')}`}
            onClick={closeSidebar}
          >
            Companies
          </a>
        </Link>
      </li>
      <li>
        <Link href="/jobs">
          <a className={`nav-link ${isActive('/jobs')}`} onClick={closeSidebar}>
            Jobs
          </a>
        </Link>
      </li>
      <li>
        <Link href="/blog">
          <a className={`nav-link ${isActive('/blog')}`} onClick={closeSidebar}>
            Blog
          </a>
        </Link>
      </li>
      <li>
        <Link href="/ecosystem">
          <a
            className={`nav-link ${isActive('/ecosystem')}`}
            onClick={closeSidebar}
          >
            Ecosystem
          </a>
        </Link>
      </li>
      <li>
        <Link href="/sponsorship">
          <a
            className={`nav-link ${isActive('/sponsorship')}`}
            onClick={closeSidebar}
          >
            Sponsorship
          </a>
        </Link>
      </li>
      <li>
        <Link href="/about">
          <a
            className={`nav-link ${isActive('/about')}`}
            onClick={closeSidebar}
          >
            About
          </a>
        </Link>
      </li>
    </NavContainer>
  );
};

export default MainNav;
