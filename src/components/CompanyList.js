import React from 'react';
import styled from 'styled-components/macro';

const CompanyListContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 300px;
`;

export const CompanyList = ({ children, className }) => (
  <CompanyListContainer className={className}>{children}</CompanyListContainer>
);

export default CompanyList;
