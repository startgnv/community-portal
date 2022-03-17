import React from 'react';
import styled from 'styled-components/macro';
import CompanyListItemLarge from './CompanyListItemLarge';
import { SharedMapConsumer } from './CompaniesMapContext';
import { device } from '../../utils/device';
import Link from '../UI/Link';
import Button from '../UI/Button';

const Container = styled.div`
  width: 60%;
  margin-right: 30px;
  flex: 7;

  @media ${device.tabletPort}, ${device.mobile} {
    margin-right: 0;
  }
`;

const CTAContainer = styled.div`
  padding: 20px 0;
  text-align: center;
`;

const CTAHeadline = styled.h3`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const CompaniesList = ({ companies = [], jobs = [] }) => (
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

    <CTAContainer>
      <CTAHeadline>Don't see your company here?</CTAHeadline>
      <Link to="/add-company">
        <Button label="Get added to the list" />
      </Link>
    </CTAContainer>
  </Container>
);

export default CompaniesList;
