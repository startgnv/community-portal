import _ from 'lodash';
import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import AppContext from './AppContext';
import SidebarHeader from './SidebarHeader';
import { Link, Redirect } from 'react-router-dom';
import JobCategories from './JobCategories';
import Error from './Error';

import JobApply from './JobApply';

import { LinearProgress } from '@material-ui/core';

const MapPageJobContainer = styled.div`
  .job-title {
    margin: 0;
  }

  .company-name {
    margin: 0 0 10px;
  }

  .company-link {
    font-size: 16px;
    font-weight: 400;
    text-decoration: none;
    color: ${({ theme }) => theme.textDark};
  }

  .job-description {
    position: relative;
    padding-bottom: 30px;
    margin-bottom: 20px;
    overflow: hidden;
    color: ${({ theme }) => theme.textMedium};
  }
`;

const JobContent = styled.div`
  max-width: ${({ theme }) => theme.contentMaxWidth};
  margin: 0 auto;
  padding: 40px 20px 20px;
`;

const CategoriesContainer = styled.div`
  margin-bottom: 10px;
`;

export const MapPageJob = ({
  history: { goBack },
  match: {
    params: { jobID }
  }
}) => {
  const { jobs, companies, jobsLoading, companiesLoading } = useContext(
    AppContext
  );

  if (jobsLoading || companiesLoading) {
    return <LinearProgress />;
  }

  const job = _.find(jobs, { id: jobID });
  const {
    title: jobTitle,
    description: jobDescription,
    applyUrl = '',
    categories,
    companyID
  } = job;
  const {
    name: companyName,
    logoPath: companyLogoPath = '',
    coverPath: companyCoverPath = '',
    slug: companySlug
  } = _.find(companies, { id: companyID });

  if (!jobTitle) {
    return <Redirect to="/" />;
  }

  return (
    <MapPageJobContainer>
      <SidebarHeader
        coverPath={companyCoverPath}
        logoPath={companyLogoPath}
        height="120px"
        mainImgSize="80px"
      />
      <JobContent>
        <h1 className="job-title">{jobTitle}</h1>
        <h3 className="company-name">
          <Link className="company-link" to={'/companies/' + companySlug}>
            {companyName}
          </Link>
        </h3>
        {categories && categories.length > 0 && (
          <CategoriesContainer>
            <JobCategories categories={categories} />
          </CategoriesContainer>
        )}
        <JobApply job={job} />
        <div className="job-description">
          <p>{jobDescription}</p>
        </div>
      </JobContent>
    </MapPageJobContainer>
  );
};

export default MapPageJob;
