import React from 'react';
import styled from 'styled-components/macro';

const CompanyListContainer = styled.ul`
  padding: 0;
  margin: 0 0 30px;
  overflow: hidden;
`;

export const CompanyList = ({ children, className }) => (
  <CompanyListContainer className={className}>{children}</CompanyListContainer>
);

export default CompanyList;
