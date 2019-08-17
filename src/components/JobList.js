import _ from 'lodash';
import React from 'react';
import styled from 'styled-components/macro';
import JobListItem from './JobListItem';

const JobListContainer = styled.ul`
  padding: 0;
  margin: 0 -10px 30px;
  overflow: hidden;

  .list-title {
    margin: 0 0 0 10px;
  }
`;

export const JobList = ({
  jobs,
  companies,
  children,
  className,
  showTitle = true,
  showCompanyInfo = true,
  showDescription = true,
  jobCount = 0,
  filter = {
    search: '',
    categories: []
  }
}) => {
  let filteredJobs;
  if (filter.search || filter.categories.length) {
    filteredJobs = _.filter(jobs, job => {
      let match = false;
      match = _.difference(filter.categories, job.categories).length === 0;
      return match;
    });
  } else {
    filteredJobs = jobs;
  }

  return (
    <JobListContainer className={className}>
      {showTitle && (
        <h3 className="list-title">Jobs ({filteredJobs.length})</h3>
      )}
      {filteredJobs.map(job => {
        const jobCompany = _.find(companies, { id: job.companyID });
        return (
          <JobListItem
            job={job}
            company={jobCompany}
            key={job.id}
            showDescription={showDescription}
            showCompanyInfo={showCompanyInfo}
          />
        );
      })}
    </JobListContainer>
  );
};

export default JobList;
