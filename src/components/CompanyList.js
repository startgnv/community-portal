import React from 'react';
import styled from 'styled-components/macro';

const CompanyListContainer = styled.ul`
  padding: 0;
  margin: 0 -10px 30px;
  overflow: hidden;

  .list-title {
    margin: 0 0 0 10px;
  }
`;

export const CompanyList = ({
  children,
  className,
  showTitle = true,
  companyCount = 0
}) => {
  return (
    <CompanyListContainer className={className}>
      {showTitle && <h3 className="list-title">Companies ({companyCount})</h3>}
      {children}
    </CompanyListContainer>
  );
};

export default CompanyList;
