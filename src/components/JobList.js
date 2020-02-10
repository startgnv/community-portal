import _ from 'lodash';
import React from 'react';
import styled from 'styled-components/macro';
import { clearFix } from 'polished';
import { device } from './device';
import JobListItem from './JobListItem';
import JobListItemLarge from './JobListItemLarge';
import EmptyJobs from './EmptyJobs';

const JobListContainer = styled.div`
  padding: 0;
`;

const ListTitle = styled.h3`
  display: block;
  margin: 0 0 15px 10px;
  font-size: 1.6rem;
`;

const ListContainer = styled.ul`
  padding: 0;
  margin: 0 -30px -30px 0;
  list-style: none;
  ${clearFix()}
`;

const ItemContainer = styled.li`
  width: ${({ variant }) => (variant === 'large' ? '100' : 100 / 3)}%;
  padding: '0 30px 30px 0';
  float: ${({ variant }) => (variant === 'large' ? 'none' : 'left')};
  box-sizing: border-box;
  list-style-type: none;

  @media ${device.tabletPort} {
    width: ${({ variant }) => (variant === 'large' ? '100%' : '50%')};
  }

  @media ${device.mobile} {
    width: 100%;
    float: none;
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
  filter = {
    search: '',
    categories: []
  },
  variant = ''
}) => {
  const ItemComponent = variant === 'large' ? JobListItemLarge : JobListItem;
  let filteredJobs;
  if (filter.search || filter.categories.length) {
    filteredJobs = _.filter(jobs, job => {
      let match = false;
      match = _.intersection(filter.categories, job.categories).length > 0;
      if (filter.search) {
        match = job.title.toLowerCase().includes(filter.search);
      }
      return match;
    });
  } else {
    filteredJobs = jobs;
  }

  let listContent;
  if (filteredJobs.length) {
    listContent = filteredJobs.map(job => {
      const jobCompany = _.find(companies, { id: job.companyID });
      return (
        <ItemContainer variant={variant} key={job.id}>
          <ItemComponent
            job={job}
            company={jobCompany}
            showDescription={showDescription}
            showCompanyInfo={showCompanyInfo}
          />
        </ItemContainer>
      );
    });
  } else {
    listContent = <EmptyJobs />;
  }

  return (
    <JobListContainer className={className}>
      {showTitle && <ListTitle>Jobs ({filteredJobs.length})</ListTitle>}
      <ListContainer>{listContent}</ListContainer>
    </JobListContainer>
  );
};

export default JobList;
