import React, { useState, useContext } from 'react';
import styled from 'styled-components/macro';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import AppContext from './AppContext';
import Hero from './Hero';
import Error from './Error';
import PageContent from './PageContent';
import JobList from './JobList';
import JobsFilter from './JobsFilter';

import { LinearProgress } from '@material-ui/core';

const HeroHeadline = styled.h2`
  font-size: 46px;
  color: white;

  strong {
    color: ${({ theme }) => theme.teal};
    font-weight: 700;
  }
`;

const FilterContainer = styled.div`
  margin-bottom: 20px;
`;

export const MapPageIndex = () => {
  const [jobsFilter, setJobsFilter] = useState({ search: '', categories: [] });
  const { jobs, companies, jobsLoading, companiesLoading } = useContext(
    AppContext
  );
  const onFilterChange = filterChanged => {
    setJobsFilter({
      ...jobsFilter,
      ...filterChanged
    });
  };
  if (jobsLoading || companiesLoading) {
    return <LinearProgress />;
  }
  return (
    <>
      <Hero>
        <HeroHeadline>Jobs</HeroHeadline>
      </Hero>
      <PageContent>
        <FilterContainer>
          <JobsFilter onChange={onFilterChange} />
        </FilterContainer>
        <JobList
          jobs={jobs}
          companies={companies}
          filter={jobsFilter}
          showDescription={false}
          showTitle={false}
        />
      </PageContent>
    </>
  );
};

export default MapPageIndex;
