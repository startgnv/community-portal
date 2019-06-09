import React from 'react';
import styled from 'styled-components/macro';
import { Redirect } from 'react-router-dom';
import JobList from './JobList';
import JobListItem from './JobListItem';

const MapPageCompanyContainer = styled.div`
  .header {
    position: relative;
    height: 200px;
    background-image: url(${props => props.coverImg});
    background-size: cover;
    background-position: center;
  }

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
    <MapPageCompanyContainer coverImg={coverImg}>
      <div className="header">
        <button type="button" onClick={goBack}>
          Back
        </button>
        <img className="logo" src={logoImg} />
      </div>
      <div className="content">
        <h2 className="company-name">{name}</h2>
        <p className="description">{description}</p>
        <h2>Jobs</h2>
        <JobList showTitle={false}>
          {jobs.map(job => (
            <JobListItem job={job} key={job.id} showLogo={false} />
          ))}
        </JobList>
        <h2>Benefits</h2>
      </div>
    </MapPageCompanyContainer>
  );
};

export default MapPageCompany;
