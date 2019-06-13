import React, { useState } from 'react';
import styled from 'styled-components/macro';
import CompanyList from './CompanyList';
import CompanyListItem from './CompanyListItem';

const MapPageComapniesContainer = styled.div`
  padding: 20px;
`;

export const MapPageCompanies = ({ companies = [] }) => {
  return (
    <MapPageComapniesContainer>
      <CompanyList companyCount={companies.length}>
        {companies.map(company => (
          <CompanyListItem company={company} />
        ))}
      </CompanyList>
    </MapPageComapniesContainer>
  );
};

export default MapPageCompanies;
