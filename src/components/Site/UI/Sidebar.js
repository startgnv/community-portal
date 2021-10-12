import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import { device } from '../../utils/device';
import AppContext from '../../AppContext';
import MainNav from './MainNav';

const SidebarContainer = styled.div`
  position: fixed;
  width: 300px;
  top: 0;
  padding-top: ${({ theme }) => theme.headerHeight};
  bottom: 0;
  right: ${({ isOpen }) =>
    isOpen && (device.mobile || device.tabletPort) ? '0' : '-300px'};
  background: white;
  box-sizing: border-box;
  overflow: auto;
  transition: 250ms;
  z-index: 9998;
`;

export const Sidebar = () => {
  const { sidebarOpen } = useContext(AppContext);
  return (
    <SidebarContainer isOpen={sidebarOpen}>
      <MainNav />
    </SidebarContainer>
  );
};

export default Sidebar;
