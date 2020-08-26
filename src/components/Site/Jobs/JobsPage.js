import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components/macro';
import AppContext from '../../AppContext';
import Hero from '../UI/Hero';
import JobList from './JobList';
import JobsFilter from './JobsFilter';
import heroBG from '../../../assets/images/jobs-hero.jpg';
import { Helmet } from 'react-helmet';
import EmptyJobs from './EmptyJobs';

import { LinearProgress } from '@material-ui/core';
import ProgressBar from '../UI/ProgressBar';

const JobsPageContent = styled.div`
  max-width: calc(${({ theme }) => theme.contentMaxWidth} + 60px);
  min-height: 400px;
  margin: 0 auto;
  padding: 30px;
`;

const FilterContainer = styled.div`
  margin-bottom: 20px;
`;

const ListContainer = styled.div`
  margin-bottom: 40px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const JobsPage = () => {
  const [jobsFilter, setJobsFilter] = useState({
    search: '',
    categories: [],
    companies: [],
    types: []
  });

  const [featuredJobsCount, setFeaturedJobCount] = useState(0);
  const [allJobsCount, setAllJobCount] = useState(0);

  const {
    jobs,
    companies,
    jobsLoading,
    companiesLoading,
    jobCategories,
    jobCategoriesLoading
  } = useContext(AppContext);

  const onFilterChange = filterChanged => {
    setJobsFilter({
      ...jobsFilter,
      ...filterChanged
    });
  };

  if (jobsLoading || companiesLoading || jobCategoriesLoading) {
    return <LinearProgress />;
  }

  const featuredJobs = jobs.filter(job => job.featured);
  const nonFeaturedJobs = jobs.filter(job => !job.featured);
  console.warn(featuredJobsCount, allJobsCount);

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
            filteredCount={featuredJobsCount + allJobsCount}
            companies={companies}
            categories={jobCategories}
          />
        </FilterContainer>
        <ListContainer>
          <JobList
            jobs={featuredJobs}
            companies={companies}
            categories={jobCategories}
            filter={jobsFilter}
            showDescription={false}
            title="Featured Jobs"
            showCount
            variant="large"
            setJobCount={setFeaturedJobCount}
            hideWhenEmpty
          />
        </ListContainer>
        <ListContainer>
          <JobList
            jobs={nonFeaturedJobs}
            companies={companies}
            categories={jobCategories}
            filter={jobsFilter}
            showDescription={false}
            title="All Jobs"
            showCount
            variant="large"
            setJobCount={setAllJobCount}
            hideWhenEmpty
          />
        </ListContainer>
        {featuredJobsCount === 0 && allJobsCount === 0 && <EmptyJobs />}
      </JobsPageContent>
    </>
  );
};

export default JobsPage;
