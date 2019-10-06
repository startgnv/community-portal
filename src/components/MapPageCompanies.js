import React from 'react';
import styled from 'styled-components/macro';
import CompanyListItemExpanded from './CompanyListItemExpanded';
import { SharedMapConsumer } from './CompaniesMapContext';

const MapPageComapniesContainer = styled.div`
  width: 60%;
  margin-right: 30px;
  flex: 7;
`;

export const MapPageCompanies = ({
  companies = [],
  jobs = [],
  onCompanyMouseEnter = () => {}
}) => (
  <MapPageComapniesContainer>
    <SharedMapConsumer>
      {({ setActiveCompany }) => {
        return companies.map(company => {
          const companyJobs = jobs.filter(job => job.companyID === company.id);
          return (
            <CompanyListItemExpanded
              company={company}
              jobs={companyJobs}
              key={company.id}
              onMouseEnter={() => setActiveCompany(company.id)}
            />
          );
        });
      }}
    </SharedMapConsumer>
  </MapPageComapniesContainer>
);

export default MapPageCompanies;
