import React from 'react';
import styled from 'styled-components/macro';
import CompanyListItemLarge from './CompanyListItemLarge';
import AddCompanyCTA from '../AddCompanyCTA';
import { SharedMapConsumer } from './CompaniesMapContext';
import { device } from '../device';

const Container = styled.div`
  width: 60%;
  margin-right: 30px;
  flex: 7;

  @media ${device.tabletPort}, ${device.mobile} {
    margin-right: 0;
  }
`;

export const CompaniesList = ({
  companies = [],
  jobs = [],
  onCompanyMouseEnter = () => {}
}) => (
  <Container>
    <SharedMapConsumer>
      {({ setActiveCompany }) => {
        return companies.map(company => {
          const companyJobs = jobs.filter(job => job.companyID === company.id);
          return (
            <CompanyListItemLarge
              company={company}
              jobs={companyJobs}
              key={company.id}
              onMouseEnter={() => setActiveCompany(company.id)}
            />
          );
        });
      }}
    </SharedMapConsumer>
    <AddCompanyCTA />
  </Container>
);

export default CompaniesList;
