import _ from 'lodash';
import React from 'react';
import styled from 'styled-components/macro';
import { clearFix } from 'polished';
import JobListItem from './JobListItem';

const JobListContainer = styled.ul`
  padding: 0;
  margin: 0 -10px 30px;
  ${clearFix()}
`;

const ListTitle = styled.h3`
  display: block;
  margin: 0 0 0 10px;
  font-size 13px;
  font-family: 'Montserrat';
  fon-weight: bold;
  text-transform: uppercase;
`;

const ListContainer = styled.ul`
  padding: 0;
`;

const ItemContainer = styled.div`
  width: 33.33333%;
  padding: 0 30px 30px 0;
  float: left;
  box-sizing: border-box;
`;

export const JobList = ({
  jobs,
  companies,
  children,
  className,
  showTitle = true,
  showCompanyInfo = true,
  showDescription = true,
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
      if (filter.search) {
        match = job.title.toLowerCase().includes(filter.search);
      }
      return match;
    });
  } else {
    filteredJobs = jobs;
  }

  return (
    <JobListContainer className={className}>
      {showTitle && <ListTitle>Jobs ({filteredJobs.length})</ListTitle>}
      <ListContainer>
        {filteredJobs.map(job => {
          const jobCompany = _.find(companies, { id: job.companyID });
          return (
            <ItemContainer>
              <JobListItem
                job={job}
                company={jobCompany}
                key={job.id}
                showDescription={showDescription}
                showCompanyInfo={showCompanyInfo}
              />
            </ItemContainer>
          );
        })}
      </ListContainer>
    </JobListContainer>
  );
};

export default JobList;
