import React from 'react';
import styled from 'styled-components/macro';
import CompanyList from './CompanyList';
import CompanyListItemExpanded from './CompanyListItemExpanded';

const MapPageComapniesContainer = styled.div`
  width: 60%;
  margin-right: 30px;
  flex: 7;
`;

export const MapPageCompanies = ({ companies = [], jobs = [] }) => (
  <MapPageComapniesContainer>
    {companies.map(company => {
      const companyJobs = jobs.filter(job => job.companyID === company.id);
      return (
        <CompanyListItemExpanded
          company={company}
          jobs={companyJobs}
          key={company.id}
        />
      );
    })}
  </MapPageComapniesContainer>
);

export default MapPageCompanies;
