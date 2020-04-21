import React, { useState, useContext } from 'react';
import styled from 'styled-components/macro';
import AppContext from '../../AppContext';
import Hero from '../UI/Hero';
import JobList from './JobList';
import JobsFilter from './JobsFilter';
import heroBG from '../../../assets/images/jobs-hero.jpg';
import { Helmet } from 'react-helmet';

import { LinearProgress } from '@material-ui/core';
import ProgressBar from '../UI/ProgressBar';

const JobsPageContent = styled.div`
  max-width: ${({ theme }) => theme.contentMaxWidth};
  min-height: 400px;
  margin: 0 auto;
  padding: 30px;
`;

const FilterContainer = styled.div`
  margin-bottom: 20px;
`;

export const JobsPage = () => {
  const [jobsFilter, setJobsFilter] = useState({
    search: '',
    categories: [],
    companies: [],
    types: []
  });

  const [displayJobCount, setJobCount] = useState(0);

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
      <Helmet>
        <title>startGNV - Job Board</title>
        <meta name="description" content="startGNV Job Board" />
        <meta
          name="og:title"
          property="og:title"
          content="startGNV Job Board"
        />
        <meta
          name="og:description"
          property="og:description"
          content="startGNV is an initiative by startupGNV to promote and grow the Gainesville startup, tech, and biotech communities."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <ProgressBar />

      <Hero bgImage={heroBG} title="Available Positions" size="medium" />
      <JobsPageContent>
        <FilterContainer>
          <JobsFilter
            onChange={onFilterChange}
            filteredCount={displayJobCount}
          />
        </FilterContainer>
        <JobList
          jobs={jobs}
          companies={companies}
          filter={jobsFilter}
          showDescription={false}
          showTitle={false}
          variant="large"
          setJobCount={setJobCount}
        />
      </JobsPageContent>
    </>
  );
};

export default JobsPage;
