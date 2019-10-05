import React from 'react';
import { clearFix } from 'polished';
import CompanyListItem from './CompanyListItem';
import styled from 'styled-components/macro';

const CompanyListContainer = styled.div``;

const ListTitle = styled.h3`
  display: block;
  margin: 0 0 0 10px;
  font-size 13px;
  font-family: 'Montserrat';
  font-weight: bold;
  text-transform: uppercase;
`;

const ListContainer = styled.ul`
  margin-right: -30px;
  padding: 0;
  ${clearFix()}
`;

const CompanyItemContainer = styled.div`
  width: 33%;
  padding-right: 30px;
  float: left;
  box-sizing: border-box;
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
          <CompanyItemContainer>
            <CompanyListItem company={company} />
          </CompanyItemContainer>
        ))}
      </ListContainer>
    </CompanyListContainer>
  );
};

export default CompanyList;
