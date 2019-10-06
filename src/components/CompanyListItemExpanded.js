import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import StorageImg from './StorageImg';

const ItemContainer = styled.div`
  height: 170px;
  margin-bottom: 30px;
  box-shadow: 3px 0 13px 0 rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  overflow: hidden;

  .container-link {
    text-decoration: none;
  }

  .jobs-link {
    font-size: 13px;
    height: 32px;
    text-transform: uppercase;
    font-weight: bold;
    color: ${({ theme }) => theme.purple};
    text-decoration: none;
  }
`;

const Images = styled.div`
  position: relative;
  width: 210px;
  height: 100%;
  float: left;
  background-image: url(${({ coverImg }) => coverImg});
  background-size: cover;
  background-position: center;

  .logo {
    position: absolute;
    width: 50px;
    height: 50px;
    top: 14px;
    right: -26px;
    border: solid 2px white;
    border-radius: 6px;
  }
`;

const CompanyInfo = styled.div`
  padding: 20px 20px 20px 46px;
  overflow: hidden;
`;

const CompanyName = styled.span`
  display: block;
  font-size: 13px;
  color: ${({ theme }) => theme.deepNavy};
  line-height: 16px;
  text-transform: uppercase;
  font-weight: bold;
`;

const ShortDescription = styled.p`
  margin-bottom: 10px;
  font-size: 12px;
`;

const EmployeeCount = styled.span`
  display: block;
  color: ${({ theme }) => theme.textMedium};
`;

const CompaniListItemExpanded = ({
  company: {
    name,
    employeeCount = '',
    slug = '',
    logoPath = '',
    coverImg = '',
    shortDescription = ''
  } = {},
  jobs = [],
  onMouseEnter = () => {}
}) => (
  <ItemContainer onMouseEnter={onMouseEnter}>
    <Link className="container-link" to={'/companies/' + slug}>
      <Images coverImg={coverImg}>
        <StorageImg className="logo" alt={name} path={logoPath} />
      </Images>
      <CompanyInfo>
        <CompanyName>{name}</CompanyName>
        <EmployeeCount>{employeeCount || '10+'} Employees</EmployeeCount>
        <ShortDescription>{shortDescription}</ShortDescription>
        {jobs.length > 0 && (
          <Link className="jobs-link" to={'/companies/' + slug}>
            View {jobs.length} job{jobs.length !== 1 && 's'}
          </Link>
        )}
      </CompanyInfo>
    </Link>
  </ItemContainer>
);

export default CompaniListItemExpanded;