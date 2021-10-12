import React, { useContext } from 'react';
import styled from 'styled-components';
import AppContext from '../../AppContext';
import { device } from '../../utils/device';
import MainNav from '../UI/MainNav';
import Logo from '../UI/Logo';

const HeaderContainer = styled.div`
  height: ${({ theme }) => theme.headerHeight};
  display: flex;
  top: 0;
  left: 0;
  right: 0;
`;

const NavContainer = styled.div`
  flex: 1;

  @media ${device.tabletPort}, ${device.mobile} {
    display: none;
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
  z-index: 9999;
  position: fixed;
  box-sizing: border-box;
  background-color: ${({ variant }) =>
    variant === 'light' ? 'rgb(0 0 0 / 20%)' : 'white'};
`;

const HamburgerContainer = styled.div`
  position: absolute;
  display: none;
  cursor: pointer;
  top: 28px;
  right: 30px;
  height: 24px;
  width: 32px;

  @media ${device.tabletPort}, ${device.mobile} {
    display: inline-block;
  }
`;

const Hamburger = styled.div`
  height: 2px;
  background-color: ${({ variant, theme }) =>
    variant === 'light' ? theme.textLight : theme.textDark};

  &:before,
  &:after {
    content: '';
    position: absolute;
    display: block;
    height: 2px;
    width: 100%;
    top: 11px;
    background-color: ${({ variant, theme }) =>
      variant === 'light' ? theme.textLight : theme.textDark};
  }

  &:after {
    top: 22px;
  }
`;

export const Header = ({ className, transparent }) => {
  const { sidebarOpen, openSidebar, closeSidebar } = useContext(AppContext);
  return (
    <HeaderContainer className={className}>
      <HeaderContent variant={transparent ? 'light' : 'dark'}>
        <Logo variant={transparent ? 'light' : 'dark'} />
        <NavContainer>
          <MainNav variant={transparent ? 'light' : 'dark'} />
        </NavContainer>
        <HamburgerContainer onClick={sidebarOpen ? closeSidebar : openSidebar}>
          <Hamburger variant={transparent ? 'light' : 'dark'} />
        </HamburgerContainer>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
