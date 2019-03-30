import React from 'react';
import styled from 'styled-components/macro';

const SidebarContainer = styled.div`
  float: right;
  width: 460px;
  background: white;
  box-sizing: border-box;
  padding: 20px;
`;

export const Sidebar = ({ children, className }) => (
  <SidebarContainer className={className}>{children}</SidebarContainer>
);

export default Sidebar;
