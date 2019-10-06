import _ from 'lodash';
import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
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
  const [jobValue, jobLoading, jobError] = useCollection(
    db.collection('jobs').doc(jobID)
  );
  // TODO Find a way to get a single company here based on job result rather than just getting all of the companies
  const [companiesValue, companiesLoading, companiesError] = useCollection(
    db.collection('companies')
  );
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [clickedApply, setClickedApply] = useState(false);

  if (jobLoading || companiesLoading) {
    return <LinearProgress />;
  }

  if (jobError || companiesError) {
    return <Error />;
  }

  const companies = companiesValue.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  const {
    title: jobTitle,
    description: jobDescription,
    applyUrl = '',
    categories,
    companyID
  } = jobValue.data();
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
    <MapPageJobContainer showFullDesc={showFullDesc}>
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
        <JobApply applyUrl={applyUrl} />
        <div className="job-description">
          <p>{jobDescription}</p>
        </div>
      </JobContent>
    </MapPageJobContainer>
  );
};

export default MapPageJob;
