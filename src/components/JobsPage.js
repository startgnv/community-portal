import React, { useState, useContext } from 'react';
import styled from 'styled-components/macro';
import AppContext from './AppContext';
import Hero from './Hero';
import JobList from './JobList';
import JobsFilter from './JobsFilter';
import heroBG from '../assets/images/hero-bg2.jpg';

import { LinearProgress } from '@material-ui/core';

const JobsPageContent = styled.div`
  max-width: ${({ theme }) => theme.contentMaxWidth};
  min-height: 400px;
  margin: 0 auto;
  padding: 30px;
`;

const FilterContainer = styled.div`
  margin-bottom: 20px;
`;

export const MapPageIndex = () => {
  const [jobsFilter, setJobsFilter] = useState({
    search: '',
    categories: [],
    types: []
  });
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
      <Hero bgImage={heroBG} title="Available Positions" size="medium" />
      <JobsPageContent>
        <FilterContainer>
          <JobsFilter onChange={onFilterChange} />
        </FilterContainer>
        <JobList
          jobs={jobs}
          companies={companies}
          filter={jobsFilter}
          showDescription={false}
          showTitle={false}
          variant="large"
        />
      </JobsPageContent>
    </>
  );
};

export default MapPageIndex;
