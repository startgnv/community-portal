import _ from 'lodash';
import React from 'react';
import styled from 'styled-components/macro';
import { clearFix } from 'polished';
import { device } from '../../utils/device';
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
  margin: 0 0 -30px 0;
  list-style: none;
  ${clearFix()}
`;

const ItemContainer = styled.li`
  width: ${({ variant }) => (variant === 'large' ? '100' : 100 / 3)}%;
  padding: ${({ variant }) => (variant === 'large' ? '0' : '0 30px 30px 0')};
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
  categories,
  className,
  title = '',
  showCount = false,
  showCompanyInfo = true,
  showDescription = true,
  filter = {
    search: '',
    categories: [],
    companies: [],
    types: []
  },
  variant = '',
  setJobCount,
  hideWhenEmpty = false
}) => {
  const ItemComponent = variant === 'large' ? JobListItemLarge : JobListItem;

  const searchFilter = job =>
    // Search by job name
    job.title.toLowerCase().includes(filter.search.toLowerCase()) ||
    // Search by company name
    companies
      .find(c => c.id === job.companyID)
      .name.toLowerCase()
      .includes(filter.search) ||
    // Search by job categories
    job.categories.reduce((acc, cat) => {
      const candidate = categories.find(c => c.id === cat);
      return candidate
        ? acc ||
            candidate.name.toLowerCase().includes(filter.search.toLowerCase())
        : acc;
    }, false);
  const categoryFilter = job =>
    filter.categories.length
      ? _.intersection(filter.categories, job.categories).length
      : true;
  const companyFilter = job =>
    filter.companies.length
      ? filter.companies.indexOf(job.companyID) > -1
      : true;
  const typeFilter = job =>
    filter.types.length ? filter.types.includes(job.type) : true;

  let displayJobs = jobs.filter(
    job =>
      searchFilter(job) &&
      categoryFilter(job) &&
      companyFilter(job) &&
      typeFilter(job)
  );

  if (companies && companies.length) {
    displayJobs = _.shuffle(displayJobs || []).sort((a, b) => {
      const companyA = companies.find(company => company.id === a.companyID);
      const companyB = companies.find(company => company.id === b.companyID);
      return companyA && companyB && companyA.featured === companyB.featured //temporary fix, startGNV site is down
        ? 0
        : companyA.featured
        ? -1
        : 1;
    });
  }

  setJobCount && setJobCount(displayJobs.length);

  let listContent;
  if (displayJobs.length) {
    listContent = displayJobs.map(job => {
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
  } else if (hideWhenEmpty) {
    return false;
  } else {
    listContent = <EmptyJobs />;
  }

  return (
    <JobListContainer className={className}>
      {title && (
        <ListTitle>
          {title}
          {showCount && ` (${displayJobs.length})`}
        </ListTitle>
      )}
      <ListContainer>{listContent}</ListContainer>
    </JobListContainer>
  );
};

export default JobList;
