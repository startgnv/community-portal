import _ from 'lodash';
import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import SidebarHeader from './SidebarHeader';
import { Link, Redirect } from 'react-router-dom';
import JobCategories from './JobCategories';
import Button from './Button';
import Error from './Error';
import TextInput from './TextInput';

import { LinearProgress } from '@material-ui/core';

const MapPageJobContainer = styled.div`
  .content {
    padding: 40px 20px 20px;
  }

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

  .apply-btn {
    margin: 0 0 10px 0;
  }

  .email-collect {
    padding: 20px;
    background-color: ${({ theme }) => theme.uiBackground};
    border-radius: 6px;
    text-align: center;

    h4 {
      margin: 0 0 10px 0;
    }

    .email-input {
      margin-bottom: 10px;
    }

    .no-thanks {
      margin-top: 10px;
      font-size: 12px;
      color: ${({ theme }) => theme.textMedium};
      cursor: pointer;

      &:hover {
        color: ${({ theme }) => theme.textDark};
        text-decoration: underline;
      }
    }
  }

  .job-description {
    position: relative;
    max-height: ${({ showFullDesc }) => (showFullDesc ? 'none' : '120px')};
    padding-bottom: 30px;
    margin-bottom: 20px;
    overflow: hidden;
    color: ${({ theme }) => theme.textMedium};

    &:after {
      position: absolute;
      display: ${({ showFullDesc }) => (showFullDesc ? 'none' : 'block')};
      bottom: 30px;
      height: 80px;
      width: 100%;
      background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 0) 100%
      );
      content: '';
      z-index: 2;
    }

    .show-full {
      position: absolute;
      width: 100%;
      height: 30px;
      bottom: 0;
      background: white;
      line-height: 30px;
      font-weight: 600;
      font-size: 12px;
      text-align: center;
      z-index: 3;
      cursor: pointer;
      color: ${({ theme }) => theme.textMedium};
    }
  }
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

  const onApplyClick = () => {
    setClickedApply(true);
  };
  const onNoThanksClick = () => {
    window.open(applyUrl);
  };
  let applyContent;
  if (clickedApply) {
    applyContent = (
      <div className="email-collect">
        <h4>Leave your email so we can keep in touch!</h4>
        <TextInput className="email-input" placeholder="Email" fullWidth />
        <Button label="Submit" size="large" fullWidth />
        <span className="no-thanks" onClick={onNoThanksClick}>
          No thanks, just take me to the application
        </span>
      </div>
    );
  } else {
    applyContent = (
      <Button
        className="apply-btn"
        label="Apply"
        size="extraLarge"
        onClick={onApplyClick}
        fullWidth
      />
    );
  }
  return (
    <MapPageJobContainer showFullDesc={showFullDesc}>
      <SidebarHeader
        coverPath={companyCoverPath}
        logoPath={companyLogoPath}
        height="120px"
        mainImgSize="80px"
      />
      <div className="content">
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
        {applyContent}
        <div className="job-description">
          <p>{jobDescription}</p>
          {!showFullDesc && (
            <span className="show-full" onClick={() => setShowFullDesc(true)}>
              Show Full Description
            </span>
          )}
        </div>
        <h2>Benefits</h2>
      </div>
    </MapPageJobContainer>
  );
};

export default MapPageJob;
