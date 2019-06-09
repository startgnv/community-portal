import React from 'react';
import styled from 'styled-components/macro';

const SidebarContainer = styled.div`
  width: 460px;
  height: 100%;
  float: right;
  background: white;
  box-sizing: border-box;
  overflow: auto;
`;

export const Sidebar = ({ children, className }) => (
  <SidebarContainer className={className}>{children}</SidebarContainer>
);

export default Sidebar;
