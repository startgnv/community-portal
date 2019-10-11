import _ from 'lodash';
import React, { useContext } from 'react';
import { baseContentStyling } from './mixins';
import BusinessIcon from '@material-ui/icons/Business';
import styled from 'styled-components/macro';
import AppContext from './AppContext';
import SidebarHeader from './SidebarHeader';
import { Link, Redirect } from 'react-router-dom';
import JobCategories from './JobCategories';

import JobApply from './JobApply';

import { LinearProgress } from '@material-ui/core';
import { Parser } from 'html-to-react';

const htmlParser = new Parser();

const MapPageJobContainer = styled.div`
  background: ${({ theme }) => theme.uiBackground};

  .company-name {
    margin: 0 0 10px;
  }

  .company-link {
    display: inline-block;
    margin-right: 20px;
    height: 26px;
    line-height: 26px;
    vertical-align: top;
    font-size: 16px;
    font-weight: 400;
    text-decoration: none;
    color: ${({ theme }) => theme.textDark};
  }

  .company-icon {
    line-height: 26px;
    vertical-align: top;
  }
`;

const JobContent = styled.div`
  max-width: ${({ theme }) => theme.contentMaxWidth};
  margin: 0 auto;
  padding: 30px 20px 20px;
`;

const JobDescription = styled.div`
  ${baseContentStyling()}
`;

const CategoriesContainer = styled.div`
  display: inline-block;
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
        coverHeight={160}
        mainImgSize={80}
        title={jobTitle}
      >
        <Link className="company-link" to={'/companies/' + companySlug}>
          <BusinessIcon className="company-icon" />
          {companyName}
        </Link>
        {categories && categories.length > 0 && (
          <CategoriesContainer>
            <JobCategories categories={categories} />
          </CategoriesContainer>
        )}
      </SidebarHeader>
      <JobContent>
        <JobApply job={job} />
        <JobDescription>{htmlParser.parse(jobDescription)}</JobDescription>
      </JobContent>
    </MapPageJobContainer>
  );
};

export default MapPageJob;
