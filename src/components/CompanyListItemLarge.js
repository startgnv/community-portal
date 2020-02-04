import React from 'react';
import styled from 'styled-components';
import { device } from './device';
import { Link } from 'react-router-dom';
import { storage } from '../firebase';
import { useDownloadURL } from 'react-firebase-hooks/storage';
import StorageImg from './StorageImg';

const ItemContainer = styled.div`
  height: 170px;
  margin-bottom: 30px;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 3px 0 13px 0 rgba(0, 0, 0, 0.05);
  transition: 200ms;
  cursor: pointer;
  background: white;

  &:hover {
    box-shadow: 3px 0 13px 0 rgba(0, 0, 0, 0.15);
    transform: scale(1.01);
    transform-origin: center;
  }

  .container-link {
    text-decoration: none;
  }

  .jobs-link {
    font-size: 13px;
    height: 32px;
    text-transform: uppercase;
    font-weight: bold;
    color: ${({ theme }) => theme.orange};
    text-decoration: none;
  }

  @media ${device.tabletPort}, ${device.mobile} {
    height: auto;
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

  @media ${device.tabletPort}, ${device.mobile} {
    width: 100%;
    height: 80px;
    float: none;
    margin-bottom: 26px;

    .logo {
      top: auto;
      left: 20px;
      bottom: -26px;
    }
  }
`;

const CompanyInfo = styled.div`
  padding: 20px 20px 20px 46px;
  overflow: hidden;

  @media ${device.tabletPort}, ${device.mobile} {
    padding: 20px;
  }
`;

const CompanyName = styled.span`
  display: block;
  margin-bottom: 5px;
  font-size: 1rem;
  color: ${({ theme }) => theme.deepNavy};
  line-height: 16px;
  text-transform: uppercase;
  font-weight: bold;
`;

const ShortDescription = styled.p`
  margin-bottom: 10px;
  font-size: 0.8rem;
  line-height: 1rem;
`;

const EmployeeCount = styled.span`
  display: block;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.textMedium};
`;

const CompanyListItemLarge = ({
  company: {
    name,
    employeeCount = '',
    slug = '',
    logoPath = '',
    coverPath = '',
    shortDescription = ''
  } = {},
  jobs = [],
  onMouseEnter = () => {}
}) => {
  const [coverUrl] = useDownloadURL(coverPath ? storage.ref(coverPath) : '');
  return (
    <ItemContainer onMouseEnter={onMouseEnter}>
      <Link className="container-link" to={'/companies/' + slug}>
        <Images coverImg={coverUrl}>
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
};

export default CompanyListItemLarge;
