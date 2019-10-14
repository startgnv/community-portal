import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { clearFix } from 'polished';
import StorageImg from './StorageImg';
import Button from './Button';

const CompanyListItemContainer = styled.li`
  list-style-type: none;

  .link-container {
    display: block;
    padding: 13px;
    border-radius: 6px;
    text-decoration: none;
    box-shadow: 3px 0 13px 0 rgba(0, 0, 0, 0.15);
    background: white;
    ${clearFix()}

    &:hover {
      cursor: pointer;
    }
  }

  .company-img {
    display: block;
    flex: 1;
    width: 54px;
    height: 54px;
    max-width: 54px;
    float: left;
    border-radius: 3px;
    margin-right: 10px;
  }
`;

const CompanyInfo = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const CompanyName = styled.span`
  display: block;
  font-size: 13px;
  color: ${({ theme }) => theme.deepNavy};
  height: 32px;
  line-height: 16px;
  text-transform: uppercase;
  font-weight: bold;
`;

const EmployeeCount = styled.span`
  display: block;
  color: ${({ theme }) => theme.textMedium};
`;

export const CompanyListItem = ({
  company: { name, employeeCount = '', slug = '', logoPath = '' } = {},
  showLogo = true
}) => (
  <CompanyListItemContainer>
    <Link className="link-container" to={`/companies/${slug}`}>
      <CompanyInfo>
        {showLogo && (
          <StorageImg className="company-img" alt={name} path={logoPath} />
        )}
        <div>
          <CompanyName>{name}</CompanyName>
          {employeeCount && (
            <EmployeeCount>{employeeCount || '10+'} Employees</EmployeeCount>
          )}
        </div>
      </CompanyInfo>
      <Button label="View Company" size="small" fullWidth />
    </Link>
  </CompanyListItemContainer>
);

export default CompanyListItem;
