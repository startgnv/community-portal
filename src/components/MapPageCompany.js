import React from 'react';
import styled from 'styled-components/macro';
import { Redirect } from 'react-router-dom';
import SidebarHeader from './SidebarHeader';
import JobList from './JobList';

const MapPageCompanyContainer = styled.div`
  .logo {
    position: absolute;
    width: 120px;
    height: 120px;
    bottom: -30px;
    left: 30px;
    border-radius: 100%;
    border: solid 3px white;
    box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.15);
  }

  .content {
    padding: 50px 30px 30px;
  }

  .company-name {
    margin: 0;
  }
`;

const CompanyLink = styled.div`
  margin-bottom: 10px;

  a {
    color: ${({ theme }) => theme.textMedium};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const MapPageCompany = ({
  company: { name, logoPath, coverPath = '', description = '', url = '' } = {},
  jobs = []
}) => {
  if (!name) {
    return <Redirect to="/" />;
  }
  return (
    <MapPageCompanyContainer>
      <SidebarHeader coverPath={coverPath} logoPath={logoPath} />
      <div className="content">
        <h1 className="company-name">{name}</h1>
        <CompanyLink>
          <a href={url} rel="noopener noreferrer" target="_blank">
            View Website
          </a>
        </CompanyLink>
        <p className="description">{description}</p>
        <h2>Jobs</h2>
        <JobList jobs={jobs} showTitle={false} showCompanyInfo={false} />
        <h2>Culture</h2>
        <h2>Photos</h2>
      </div>
    </MapPageCompanyContainer>
  );
};

export default MapPageCompany;
