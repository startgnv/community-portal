import React from 'react';
import styled from 'styled-components/macro';
import CompanyList from './CompanyList';

const MapPageComapniesContainer = styled.div`
  padding: 20px;
`;

export const MapPageCompanies = ({ companies = [] }) => (
  <MapPageComapniesContainer>
    <CompanyList companies={companies} />
  </MapPageComapniesContainer>
);

export default MapPageCompanies;
