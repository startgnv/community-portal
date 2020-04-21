import React from 'react';
import { clearFix } from 'polished';
import { device } from '../../utils/device';
import CompanyListItem from './CompanyListItem';
import styled from 'styled-components/macro';

const CompanyListContainer = styled.div``;

const ListTitle = styled.h3`
  display: block;
  margin: 0 0 0 10px;
  font-size: 13px;
  font-family: 'Montserrat';
  font-weight: bold;
  text-transform: uppercase;
`;

const ListContainer = styled.ul`
  margin: 0 -30px -30px 0;
  padding: 0;
  ${clearFix()}
`;

const CompanyItemContainer = styled.div`
  width: 33%;
  padding: 0 30px 30px 0;
  float: left;
  box-sizing: border-box;

  @media ${device.tabletPort} {
    width: 50%;
  }

  @media ${device.mobile} {
    width: 100%;
    float: none;
  }
`;

export const CompanyList = ({
  className,
  jobs,
  companies,
  showTitle = true,
  companyCount = 0
}) => {
  return (
    <CompanyListContainer className={className}>
      {showTitle && <ListTitle>Companies ({companies.length})</ListTitle>}
      <ListContainer>
        {companies.map(company => (
          <CompanyItemContainer key={company.id}>
            <CompanyListItem company={company} />
          </CompanyItemContainer>
        ))}
      </ListContainer>
    </CompanyListContainer>
  );
};

export default CompanyList;
