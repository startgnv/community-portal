import React from 'react';
import styled from 'styled-components/macro';
import { Redirect } from 'react-router-dom';
import SidebarHeader from './SidebarHeader';
import JobList from './JobList';
import JobListItem from './JobListItem';

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

export const MapPageCompany = ({
  history: { goBack },
  company: { name, logoImg, coverImg = '', description = '' } = {},
  jobs = []
}) => {
  if (!name) {
    return <Redirect to="/" />;
  }
  return (
    <MapPageCompanyContainer>
      <SidebarHeader coverImg={coverImg} mainImg={logoImg} />
      <div className="content">
        <h1 className="company-name">{name}</h1>
        <p className="description">{description}</p>
        <h2>Jobs</h2>
        <JobList showTitle={false}>
          {jobs.map(job => (
            <JobListItem job={job} key={job.id} showCompanyInfo={false} />
          ))}
        </JobList>
        <h2>Culture</h2>
        <h2>Photos</h2>
      </div>
    </MapPageCompanyContainer>
  );
};

export default MapPageCompany;
